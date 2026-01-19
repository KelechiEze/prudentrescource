import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';

interface Professional {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  credentials: 'Verified' | 'Pending' | 'Unverified';
  availability: 'Open' | 'Unavailable';
  status: 'Active' | 'Deactived';
  email: string;
  city: string;
  state: string;
  phone: string;
  resume?: string;
  certificate?: string;
}

export async function GET(request: NextRequest) {
  console.log('=== Professionals API Called ===');
  
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    console.log('Action:', action);
    console.log('Search params:', Object.fromEntries(searchParams.entries()));
    
    // Get all professionals
    if (action === 'get-all') {
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const offset = (page - 1) * limit;
      
      const search = searchParams.get('search') || '';
      const credentials = searchParams.get('credentials');
      const sort = searchParams.get('sort') || 'Newest First';

      let connection;
      try {
        connection = await db.getConnection();
        console.log('Database connection established');
        
        // Start building base query
        let baseQuery = `
          FROM resume_submissions 
          WHERE 1=1
        `;
        
        const params: any[] = [];
        
        // Apply search filter
        if (search) {
          baseQuery += ` AND (
            first_name LIKE ? OR 
            last_name LIKE ? OR 
            email LIKE ? OR 
            position LIKE ? OR 
            city LIKE ?
          )`;
          const searchTerm = `%${search}%`;
          params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
        }
        
        // Apply credentials filter
        if (credentials && credentials !== 'All Credentials') {
          baseQuery += ` AND status = ?`;
          params.push(credentials.toLowerCase());
        }
        
        console.log('Base query params:', params);
        
        // Get total count
        const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
        console.log('Count query:', countQuery);
        
        const [countResult]: any = await connection.execute(countQuery, params);
        const total = countResult[0]?.total || 0;
        console.log('Total records:', total);
        
        // Build main query with SELECT clause
        let selectQuery = `
          SELECT 
            id,
            CONCAT(first_name, ' ', last_name) as name,
            first_name as firstName,
            last_name as lastName,
            position as role,
            CASE 
              WHEN status = 'pending' THEN 'Pending'
              WHEN status = 'verified' THEN 'Verified'
              ELSE 'Unverified'
            END as credentials,
            'Open' as availability,
            'Active' as status,
            email,
            city,
            state,
            phone,
            resume_file_name as resume,
            cert_file_name as certificate,
            submitted_at
          ${baseQuery}
        `;
        
        // Apply sorting
        switch (sort) {
          case 'Newest First':
            selectQuery += ' ORDER BY submitted_at DESC';
            break;
          case 'Oldest First':
            selectQuery += ' ORDER BY submitted_at ASC';
            break;
          case 'Name (A-Z)':
            selectQuery += ' ORDER BY first_name ASC, last_name ASC';
            break;
          case 'Name (Z-A)':
            selectQuery += ' ORDER BY first_name DESC, last_name DESC';
            break;
          default:
            selectQuery += ' ORDER BY submitted_at DESC';
        }
        
        // Apply pagination - use template literals for LIMIT/OFFSET
        selectQuery += ` LIMIT ${limit} OFFSET ${offset}`;
        
        console.log('Main query:', selectQuery);
        console.log('Main query params:', params);
        
        // Execute main query WITHOUT LIMIT params
        const [rows]: any = await connection.execute(selectQuery, params);
        console.log('Rows returned:', rows.length);
        
        // Map to frontend Professional interface
        const professionals: Professional[] = rows.map((row: any) => ({
          id: row.id,
          name: row.name || `${row.firstName} ${row.lastName}`,
          firstName: row.firstName,
          lastName: row.lastName,
          role: row.role,
          credentials: row.credentials as 'Verified' | 'Pending' | 'Unverified',
          availability: 'Open' as 'Open' | 'Unavailable',
          status: 'Active' as 'Active' | 'Deactived',
          email: row.email,
          city: row.city || 'Unknown',
          state: row.state || 'Unknown',
          phone: row.phone || 'N/A',
          resume: row.resume,
          certificate: row.certificate
        }));
        
        return NextResponse.json({
          success: true,
          data: professionals,
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
    
    // Get single professional by ID
    if (action === 'get') {
      const id = searchParams.get('id');
      
      if (!id) {
        return NextResponse.json(
          { success: false, message: 'Professional ID is required' },
          { status: 400 }
        );
      }
      
      let connection;
      try {
        connection = await db.getConnection();
        
        const [rows]: any = await connection.execute(
          `SELECT 
            id,
            CONCAT(first_name, ' ', last_name) as name,
            first_name as firstName,
            last_name as lastName,
            position as role,
            CASE 
              WHEN status = 'pending' THEN 'Pending'
              WHEN status = 'verified' THEN 'Verified'
              ELSE 'Unverified'
            END as credentials,
            'Open' as availability,
            'Active' as status,
            email,
            city,
            state,
            phone,
            resume_file_name as resume,
            cert_file_name as certificate
          FROM resume_submissions 
          WHERE id = ?`,
          [id]
        );
        
        if (rows.length === 0) {
          return NextResponse.json(
            { success: false, message: 'Professional not found' },
            { status: 404 }
          );
        }
        
        const professional: Professional = {
          id: rows[0].id,
          name: rows[0].name || `${rows[0].firstName} ${rows[0].lastName}`,
          firstName: rows[0].firstName,
          lastName: rows[0].lastName,
          role: rows[0].role,
          credentials: rows[0].credentials as 'Verified' | 'Pending' | 'Unverified',
          availability: 'Open' as 'Open' | 'Unavailable',
          status: 'Active' as 'Active' | 'Deactived',
          email: rows[0].email,
          city: rows[0].city || 'Unknown',
          state: rows[0].state || 'Unknown',
          phone: rows[0].phone || 'N/A',
          resume: rows[0].resume,
          certificate: rows[0].certificate
        };
        
        return NextResponse.json({
          success: true,
          data: professional
        });
      } finally {
        if (connection) connection.release();
      }
    }
    
    // Simple test endpoint
    if (action === 'test') {
      let connection;
      try {
        connection = await db.getConnection();
        
        // Simple test query
        const [result]: any = await connection.execute('SELECT 1 as test');
        
        // Check table structure
        const [columns]: any = await connection.execute(`
          SHOW COLUMNS FROM resume_submissions
        `);
        
        // Get sample data if exists
        const [sample]: any = await connection.execute(`
          SELECT * FROM resume_submissions LIMIT 1
        `);
        
        return NextResponse.json({
          success: true,
          test: result[0],
          tableColumns: columns.map((col: any) => ({
            field: col.Field,
            type: col.Type,
            null: col.Null,
            key: col.Key,
            default: col.Default
          })),
          sampleData: sample[0] || 'No data found'
        });
      } catch (error) {
        console.error('Test error:', error);
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
      message: 'Professionals Management API',
      endpoints: {
        getAll: '/api/professionals?action=get-all&page=1&limit=10',
        getSingle: '/api/professionals?action=get&id=1',
        test: '/api/professionals?action=test',
        update: 'PUT /api/professionals?action=update&id=1'
      }
    });
    
  } catch (error) {
    console.error('Professionals API error:', error);
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

    console.log('Update action:', action, 'ID:', id);

    if (action === 'update' && id) {
      // Parse the request body
      const body = await request.json();
      console.log('Update data received:', body);

      let connection;
      try {
        connection = await db.getConnection();
        
        // Extract fields from the body
        const {
          firstName,
          lastName,
          email,
          city,
          state,
          phone,
          role,
          credentials
        } = body;

        // Map frontend credentials to database values
        let dbCredentials = 'unverified';
        if (credentials === 'Verified') dbCredentials = 'verified';
        if (credentials === 'Pending') dbCredentials = 'pending';
        if (credentials === 'Unverified') dbCredentials = 'unverified';

        // Build dynamic update query
        const updateFields = [];
        const values = [];

        if (firstName !== undefined) {
          updateFields.push('first_name = ?');
          values.push(firstName);
        }
        if (lastName !== undefined) {
          updateFields.push('last_name = ?');
          values.push(lastName);
        }
        if (email !== undefined) {
          updateFields.push('email = ?');
          values.push(email);
        }
        if (city !== undefined) {
          updateFields.push('city = ?');
          values.push(city);
        }
        if (state !== undefined) {
          updateFields.push('state = ?');
          values.push(state);
        }
        if (phone !== undefined) {
          updateFields.push('phone = ?');
          values.push(phone);
        }
        if (role !== undefined) {
          updateFields.push('position = ?');
          values.push(role);
        }
        if (dbCredentials) {
          updateFields.push('status = ?');
          values.push(dbCredentials);
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
          UPDATE resume_submissions 
          SET ${updateFields.join(', ')}
          WHERE id = ?
        `;

        console.log('Update query:', query);
        console.log('Update values:', values);

        const [result]: any = await connection.execute(query, values);
        
        console.log('Update result:', result);

        if (result.affectedRows === 0) {
          return NextResponse.json(
            { success: false, message: 'Professional not found or no changes made' },
            { status: 404 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Professional updated successfully',
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
        message: 'Failed to update professional',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';