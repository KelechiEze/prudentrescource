import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';

interface Organization {
  id: number;
  name: string;
  email: string;
  contact: string;
  city: string;
  state: string;
  activeRequests: number;
  successfulMatches: number;
  status: 'Active' | 'Deactived';
  availability: 'Open' | 'Unavailable';
  created_at?: string;
}

export async function GET(request: NextRequest) {
  console.log('=== Organizations API Called ===');
  
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    console.log('Action:', action);
    console.log('Search params:', Object.fromEntries(searchParams.entries()));
    
    // Get all organizations - using staffing_requests table
    if (action === 'get-all') {
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const offset = (page - 1) * limit;
      
      const search = searchParams.get('search') || '';
      const status = searchParams.get('status');
      const availability = searchParams.get('availability');
      const sort = searchParams.get('sort') || 'Newest First';

      let connection;
      try {
        connection = await db.getConnection();
        console.log('Database connection established');
        
        // Using staffing_requests table since that's what you have
        const tableName = 'staffing_requests';
        console.log(`Using table: ${tableName}`);
        
        // Start building base query
        let baseQuery = `
          FROM ${tableName} 
          WHERE 1=1
        `;
        
        const params: any[] = [];
        
        // Apply search filter - using actual columns from staffing_requests
        if (search) {
          baseQuery += ` AND (
            company_name LIKE ? OR 
            email LIKE ? OR 
            CONCAT(first_name, ' ', last_name) LIKE ? OR
            phone LIKE ? OR 
            city LIKE ? OR 
            state LIKE ?
          )`;
          const searchTerm = `%${search}%`;
          params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
        }
        
        // Apply status filter - using 'status' column from staffing_requests
        if (status && status !== 'All Status') {
          baseQuery += ` AND status = ?`;
          params.push(status.toLowerCase());
        }
        
        // Apply availability filter - not available in staffing_requests, so skip
        if (availability && availability !== 'All Availability') {
          console.log('Availability filter not available in staffing_requests table');
          // Skip as column doesn't exist
        }
        
        console.log('Base query params:', params);
        
        // Get total count - count distinct organizations by email and company_name
        const countQuery = `SELECT COUNT(DISTINCT email, company_name) as total ${baseQuery}`;
        console.log('Count query:', countQuery);
        
        const [countResult]: any = await connection.execute(countQuery, params);
        const total = countResult[0]?.total || 0;
        console.log('Total records:', total);
        
        // Build main query - FIXED: Use GROUP BY with proper aggregation
        let selectQuery = `
          SELECT 
            MIN(id) as id,
            company_name as name,
            email,
            MAX(phone) as contact,
            MAX(city) as city,
            MAX(state) as state,
            (
              SELECT COUNT(*) 
              FROM staffing_requests sr2 
              WHERE sr2.email = sr.email 
              AND sr2.status IN ('pending', 'review')
            ) as activeRequests,
            (
              SELECT COUNT(*) 
              FROM staffing_requests sr2 
              WHERE sr2.email = sr.email 
              AND sr2.status = 'completed'
            ) as successfulMatches,
            CASE 
              WHEN MAX(
                CASE 
                  WHEN sr.status IN ('pending', 'review', 'completed') THEN 1 
                  ELSE 0 
                END
              ) = 1 THEN 'Active'
              ELSE 'Deactived'
            END as status,
            'Open' as availability,
            MAX(submitted_at) as created_at
          FROM staffing_requests sr
          WHERE 1=1
        `;
        
        // Add WHERE conditions from base query
        if (search) {
          selectQuery += ` AND (
            company_name LIKE ? OR 
            email LIKE ? OR 
            CONCAT(first_name, ' ', last_name) LIKE ? OR
            phone LIKE ? OR 
            city LIKE ? OR 
            state LIKE ?
          )`;
        }
        
        if (status && status !== 'All Status') {
          selectQuery += ` AND status = ?`;
        }
        
        selectQuery += `
          GROUP BY email, company_name
        `;
        
        // Apply sorting
        switch (sort) {
          case 'Newest First':
            selectQuery += ' ORDER BY MAX(submitted_at) DESC';
            break;
          case 'Oldest First':
            selectQuery += ' ORDER BY MIN(submitted_at) ASC';
            break;
          case 'Name (A-Z)':
            selectQuery += ' ORDER BY company_name ASC';
            break;
          case 'Name (Z-A)':
            selectQuery += ' ORDER BY company_name DESC';
            break;
          case 'Most Requests':
            selectQuery += ' ORDER BY COUNT(*) DESC';
            break;
          case 'Least Requests':
            selectQuery += ' ORDER BY COUNT(*) ASC';
            break;
          default:
            selectQuery += ' ORDER BY MAX(submitted_at) DESC';
        }
        
        // Apply pagination
        selectQuery += ` LIMIT ${limit} OFFSET ${offset}`;
        
        console.log('Main query:', selectQuery);
        console.log('Main query params:', params);
        
        // Execute main query
        const [rows]: any = await connection.execute(selectQuery, params);
        console.log('Rows returned:', rows.length);
        
        // Map to frontend Organization interface
        const organizations: Organization[] = rows.map((row: any) => ({
          id: row.id,
          name: row.name || 'Unknown Organization',
          email: row.email || 'N/A',
          contact: row.contact || 'N/A',
          city: row.city || 'Unknown',
          state: row.state || 'Unknown',
          activeRequests: row.activeRequests || 0,
          successfulMatches: row.successfulMatches || 0,
          status: row.status as 'Active' | 'Deactived' || 'Active',
          availability: row.availability as 'Open' | 'Unavailable' || 'Open',
          created_at: row.created_at
        }));
        
        return NextResponse.json({
          success: true,
          data: organizations,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      } finally {
        if (connection) connection.release();
        console.log('Database connection released');
      }
    }
    
    // Get single organization by email (since companies are identified by email in staffing_requests)
    if (action === 'get') {
      const email = searchParams.get('email');
      const id = searchParams.get('id');
      
      if (!email && !id) {
        return NextResponse.json(
          { success: false, message: 'Organization email or ID is required' },
          { status: 400 }
        );
      }
      
      let connection;
      try {
        connection = await db.getConnection();
        
        let query = '';
        let queryParams: any[] = [];
        
        if (email) {
          query = `
            SELECT 
              MIN(id) as id,
              company_name as name,
              email,
              MAX(phone) as contact,
              MAX(city) as city,
              MAX(state) as state,
              (
                SELECT COUNT(*) 
                FROM staffing_requests sr2 
                WHERE sr2.email = sr.email 
                AND sr2.status IN ('pending', 'review')
              ) as activeRequests,
              (
                SELECT COUNT(*) 
                FROM staffing_requests sr2 
                WHERE sr2.email = sr.email 
                AND sr2.status = 'completed'
              ) as successfulMatches,
              CASE 
                WHEN MAX(
                  CASE 
                    WHEN sr.status IN ('pending', 'review', 'completed') THEN 1 
                    ELSE 0 
                  END
                ) = 1 THEN 'Active'
                ELSE 'Deactived'
              END as status,
              'Open' as availability,
              MAX(submitted_at) as created_at
            FROM staffing_requests sr
            WHERE email = ?
            GROUP BY email, company_name
            LIMIT 1`;
          queryParams = [email];
        } else {
          query = `
            SELECT 
              sr.id,
              sr.company_name as name,
              sr.email,
              sr.phone as contact,
              sr.city,
              sr.state,
              (
                SELECT COUNT(*) 
                FROM staffing_requests sr2 
                WHERE sr2.email = sr.email 
                AND sr2.status IN ('pending', 'review')
              ) as activeRequests,
              (
                SELECT COUNT(*) 
                FROM staffing_requests sr2 
                WHERE sr2.email = sr.email 
                AND sr2.status = 'completed'
              ) as successfulMatches,
              CASE 
                WHEN sr.status IN ('pending', 'review', 'completed') THEN 'Active'
                ELSE 'Deactived'
              END as status,
              'Open' as availability,
              sr.submitted_at as created_at
            FROM staffing_requests sr
            WHERE sr.id = ?
            LIMIT 1`;
          queryParams = [id];
        }
        
        const [rows]: any = await connection.execute(query, queryParams);
        
        if (rows.length === 0) {
          return NextResponse.json(
            { success: false, message: 'Organization not found' },
            { status: 404 }
          );
        }
        
        const organization: Organization = {
          id: rows[0].id,
          name: rows[0].name || 'Unknown Organization',
          email: rows[0].email || 'N/A',
          contact: rows[0].contact || 'N/A',
          city: rows[0].city || 'Unknown',
          state: rows[0].state || 'Unknown',
          activeRequests: rows[0].activeRequests || 0,
          successfulMatches: rows[0].successfulMatches || 0,
          status: rows[0].status as 'Active' | 'Deactived' || 'Active',
          availability: rows[0].availability as 'Open' | 'Unavailable' || 'Open',
          created_at: rows[0].created_at
        };
        
        return NextResponse.json({
          success: true,
          data: organization
        });
      } finally {
        if (connection) connection.release();
      }
    }
    
    // Get organization statistics
    if (action === 'stats') {
      let connection;
      try {
        connection = await db.getConnection();
        
        const [stats]: any = await connection.execute(`
          SELECT 
            COUNT(DISTINCT email, company_name) as totalOrganizations,
            COUNT(DISTINCT CASE WHEN status IN ('pending', 'review') THEN email END) as activeOrganizations,
            SUM(CASE WHEN status IN ('pending', 'review') THEN 1 ELSE 0 END) as totalActiveRequests,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as totalCompletedRequests,
            COUNT(DISTINCT state) as statesCovered,
            COUNT(DISTINCT city) as citiesCovered
          FROM staffing_requests
        `);
        
        // Get organizations with most requests
        const [topOrganizations]: any = await connection.execute(`
          SELECT 
            company_name as name,
            email,
            COUNT(*) as totalRequests,
            SUM(CASE WHEN status IN ('pending', 'review') THEN 1 ELSE 0 END) as activeRequests,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completedRequests,
            MAX(submitted_at) as lastRequestDate
          FROM staffing_requests
          GROUP BY email, company_name
          ORDER BY totalRequests DESC
          LIMIT 5
        `);
        
        return NextResponse.json({
          success: true,
          stats: stats[0] || {},
          topOrganizations
        });
      } finally {
        if (connection) connection.release();
      }
    }
    
    // Create organizations table from staffing_requests data
    if (action === 'setup') {
      let connection;
      try {
        connection = await db.getConnection();
        
        // Check if organizations table exists
        const [tables]: any = await connection.execute(
          `SELECT TABLE_NAME FROM information_schema.TABLES 
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'organizations'`
        );
        
        if (tables.length === 0) {
          // Create organizations table
          await connection.execute(`
            CREATE TABLE organizations (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL UNIQUE,
              contact VARCHAR(50),
              city VARCHAR(100),
              state VARCHAR(100),
              contact_person_first VARCHAR(100),
              contact_person_last VARCHAR(100),
              active_requests INT DEFAULT 0,
              successful_matches INT DEFAULT 0,
              total_requests INT DEFAULT 0,
              status ENUM('active', 'deactivated') DEFAULT 'active',
              availability ENUM('Open', 'Unavailable') DEFAULT 'Open',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `);
          
          // Extract organizations from staffing_requests
          const [organizationsData]: any = await connection.execute(`
            SELECT 
              company_name as name,
              email,
              MAX(phone) as contact,
              MAX(city) as city,
              MAX(state) as state,
              MAX(first_name) as contact_person_first,
              MAX(last_name) as contact_person_last,
              SUM(CASE WHEN status IN ('pending', 'review') THEN 1 ELSE 0 END) as active_requests,
              SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as successful_matches,
              COUNT(*) as total_requests,
              'active' as status,
              'Open' as availability
            FROM staffing_requests
            WHERE company_name IS NOT NULL 
              AND email IS NOT NULL
            GROUP BY email, company_name
          `);
          
          if (organizationsData.length > 0) {
            await connection.execute(
              `INSERT INTO organizations (name, email, contact, city, state, contact_person_first, contact_person_last, active_requests, successful_matches, total_requests, status, availability) 
               VALUES ?`,
              [organizationsData.map((row: any) => [
                row.name,
                row.email,
                row.contact,
                row.city,
                row.state,
                row.contact_person_first,
                row.contact_person_last,
                row.active_requests,
                row.successful_matches,
                row.total_requests,
                row.status,
                row.availability
              ])]
            );
            console.log(`Created ${organizationsData.length} organizations from staffing_requests data`);
          }
          
          console.log('Organizations table created');
        }
        
        // Get table structure
        const [columns]: any = await connection.execute(`
          SHOW COLUMNS FROM organizations
        `);
        
        // Get sample data
        const [sample]: any = await connection.execute(`
          SELECT * FROM organizations LIMIT 5
        `);
        
        return NextResponse.json({
          success: true,
          message: 'Organizations table setup complete',
          tableCreated: tables.length === 0,
          tableColumns: columns.map((col: any) => ({
            field: col.Field,
            type: col.Type,
            null: col.Null,
            key: col.Key,
            default: col.Default
          })),
          sampleData: sample
        });
      } catch (error) {
        console.error('Setup error:', error);
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      } finally {
        if (connection) connection.release();
      }
    }
    
    // Default: return API info
    return NextResponse.json({
      success: true,
      message: 'Organizations Management API',
      endpoints: {
        getAll: '/api/organizations?action=get-all&page=1&limit=10',
        getSingle: '/api/organizations?action=get&email=example@company.com',
        stats: '/api/organizations?action=stats',
        setup: '/api/organizations?action=setup (create organizations table)',
        update: 'PUT /api/organizations?action=update&id=1'
      },
      note: 'Using staffing_requests table as source data'
    });
    
  } catch (error) {
    console.error('Organizations API error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to process request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');

    console.log('Update action:', action, 'ID from params:', id);

    if (action === 'update' && id) {
      // Parse the request body
      const body = await request.json();
      console.log('Update data received:', body);
      console.log('ID from body:', body.id);
      console.log('Email from body:', body.email);
      console.log('Name from body:', body.name);

      let connection;
      try {
        connection = await db.getConnection();
        
        // First check if organizations table exists
        const [tables]: any = await connection.execute(
          `SELECT TABLE_NAME FROM information_schema.TABLES 
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'organizations'`
        );
        
        const useOrganizationsTable = tables.length > 0;
        
        if (!useOrganizationsTable) {
          console.log('Organizations table not found, updating staffing_requests table instead');
          
          // Get the actual record to understand what we're updating
          const [checkRecord]: any = await connection.execute(
            `SELECT * FROM staffing_requests WHERE id = ?`,
            [id]
          );
          
          console.log('Record to update:', checkRecord[0]);
          console.log('Total records found:', checkRecord.length);
          
          if (checkRecord.length === 0) {
            // Maybe the ID is from a grouped result, try to find by email
            const { email, name } = body;
            if (email) {
              console.log('Trying to find record by email:', email);
              const [recordsByEmail]: any = await connection.execute(
                `SELECT * FROM staffing_requests WHERE email = ?`,
                [email]
              );
              console.log('Records found by email:', recordsByEmail.length);
              
              if (recordsByEmail.length > 0) {
                // Update ALL records with this email (since organizations are grouped by email)
                const {
                  name: company_name,
                  email,
                  contact: phone,
                  city,
                  state,
                  status
                } = body;

                // Map frontend status to staffing_requests status values
                let dbStatus = 'pending';
                if (status === 'Deactived') dbStatus = 'inactive';
                if (status === 'Active') dbStatus = 'pending';

                // Build dynamic update query for staffing_requests
                const updateFields = [];
                const values = [];

                if (company_name !== undefined) {
                  updateFields.push('company_name = ?');
                  values.push(company_name);
                }
                if (phone !== undefined) {
                  updateFields.push('phone = ?');
                  values.push(phone);
                }
                if (city !== undefined) {
                  updateFields.push('city = ?');
                  values.push(city);
                }
                if (state !== undefined) {
                  updateFields.push('state = ?');
                  values.push(state);
                }
                if (dbStatus) {
                  updateFields.push('status = ?');
                  values.push(dbStatus);
                }

                // Add email at the end for WHERE clause
                values.push(email);

                if (updateFields.length === 0) {
                  return NextResponse.json(
                    { success: false, message: 'No fields to update' },
                    { status: 400 }
                  );
                }

                const query = `
                  UPDATE staffing_requests 
                  SET ${updateFields.join(', ')}
                  WHERE email = ?
                `;

                console.log('Update ALL staffing_requests by email query:', query);
                console.log('Update values:', values);

                const [result]: any = await connection.execute(query, values);
                
                console.log('Update result:', result);

                return NextResponse.json({
                  success: true,
                  message: `Updated ${result.affectedRows} organization records for ${email}`,
                  affectedRows: result.affectedRows
                });
              }
            }
            
            return NextResponse.json(
              { success: false, message: 'Organization record not found' },
              { status: 404 }
            );
          }
          
          // Update specific record by ID
          const {
            name: company_name,
            email,
            contact: phone,
            city,
            state,
            status
          } = body;

          // Map frontend status to staffing_requests status values
          let dbStatus = 'pending';
          if (status === 'Deactived') dbStatus = 'inactive';
          if (status === 'Active') dbStatus = 'pending';

          // Build dynamic update query for staffing_requests
          const updateFields = [];
          const values = [];

          if (company_name !== undefined) {
            updateFields.push('company_name = ?');
            values.push(company_name);
          }
          if (email !== undefined) {
            updateFields.push('email = ?');
            values.push(email);
          }
          if (phone !== undefined) {
            updateFields.push('phone = ?');
            values.push(phone);
          }
          if (city !== undefined) {
            updateFields.push('city = ?');
            values.push(city);
          }
          if (state !== undefined) {
            updateFields.push('state = ?');
            values.push(state);
          }
          if (dbStatus) {
            updateFields.push('status = ?');
            values.push(dbStatus);
          }

          // Add ID at the end for WHERE clause
          values.push(id);

          if (updateFields.length === 0) {
            return NextResponse.json(
              { success: false, message: 'No fields to update' },
              { status: 400 }
            );
          }

          const query = `
            UPDATE staffing_requests 
            SET ${updateFields.join(', ')}
            WHERE id = ?
          `;

          console.log('Update specific staffing_requests query:', query);
          console.log('Update values:', values);

          const [result]: any = await connection.execute(query, values);
          
          console.log('Update result:', result);

          if (result.affectedRows === 0) {
            return NextResponse.json(
              { success: false, message: 'Organization record not found or no changes made' },
              { status: 404 }
            );
          }

          return NextResponse.json({
            success: true,
            message: 'Organization updated successfully in staffing_requests table',
            affectedRows: result.affectedRows
          });
        }

        // If organizations table exists, update it
        // Extract fields from the body
        const {
          name,
          email,
          contact,
          city,
          state,
          activeRequests,
          successfulMatches,
          status,
          availability
        } = body;

        // Map frontend status to database values
        let dbStatus = 'active';
        if (status === 'Deactived') dbStatus = 'deactivated';
        if (status === 'Active') dbStatus = 'active';

        // Build dynamic update query
        const updateFields = [];
        const values = [];

        if (name !== undefined) {
          updateFields.push('name = ?');
          values.push(name);
        }
        if (email !== undefined) {
          updateFields.push('email = ?');
          values.push(email);
        }
        if (contact !== undefined) {
          updateFields.push('contact = ?');
          values.push(contact);
        }
        if (city !== undefined) {
          updateFields.push('city = ?');
          values.push(city);
        }
        if (state !== undefined) {
          updateFields.push('state = ?');
          values.push(state);
        }
        if (activeRequests !== undefined) {
          updateFields.push('active_requests = ?');
          values.push(activeRequests);
        }
        if (successfulMatches !== undefined) {
          updateFields.push('successful_matches = ?');
          values.push(successfulMatches);
        }
        if (dbStatus) {
          updateFields.push('status = ?');
          values.push(dbStatus);
        }
        if (availability !== undefined) {
          updateFields.push('availability = ?');
          values.push(availability);
        }

        // Add ID at the end for WHERE clause
        values.push(id);

        if (updateFields.length === 0) {
          return NextResponse.json(
            { success: false, message: 'No fields to update' },
            { status: 400 }
          );
        }

        const query = `
          UPDATE organizations 
          SET ${updateFields.join(', ')}
          WHERE id = ?
        `;

        console.log('Update organizations query:', query);
        console.log('Update values:', values);

        const [result]: any = await connection.execute(query, values);
        
        console.log('Update result:', result);

        if (result.affectedRows === 0) {
          return NextResponse.json(
            { success: false, message: 'Organization not found or no changes made' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Organization updated successfully',
          affectedRows: result.affectedRows
        });

      } catch (dbError) {
        console.error('Database update error:', dbError);
        throw dbError;
      } finally {
        if (connection) connection.release();
      }
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action or missing ID' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Update API error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to update organization',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');

    console.log('Delete action:', action, 'ID:', id);

    if (action === 'delete' && id) {
      let connection;
      try {
        connection = await db.getConnection();
        
        // First check if organizations table exists
        const [tables]: any = await connection.execute(
          `SELECT TABLE_NAME FROM information_schema.TABLES 
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'organizations'`
        );
        
        const useOrganizationsTable = tables.length > 0;
        
        if (!useOrganizationsTable) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Organizations table does not exist. Please run /api/organizations?action=setup first.' 
            },
            { status: 400 }
          );
        }
        
        const [result]: any = await connection.execute(
          'DELETE FROM organizations WHERE id = ?',
          [id]
        );
        
        console.log('Delete result:', result);

        if (result.affectedRows === 0) {
          return NextResponse.json(
            { success: false, message: 'Organization not found' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Organization deleted successfully',
          affectedRows: result.affectedRows
        });

      } catch (dbError) {
        console.error('Database delete error:', dbError);
        throw dbError;
      } finally {
        if (connection) connection.release();
      }
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action or missing ID' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to delete organization',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';