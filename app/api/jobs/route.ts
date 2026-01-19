import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    if (action === 'get-all') {
      let connection;
      try {
        connection = await db.getConnection();
        
        // Check if job_listings table exists
        const [tables]: any = await connection.execute(
          `SELECT TABLE_NAME FROM information_schema.TABLES 
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'job_listings'`
        );
        
        if (tables.length === 0) {
          return NextResponse.json({
            success: true,
            data: [],
            message: 'Job listings table does not exist yet'
          });
        }
        
        const [rows]: any = await connection.execute(`
          SELECT 
            id,
            title,
            role,
            location,
            wages,
            DATE_FORMAT(date_posted, '%b %d, %Y') as date,
            status,
            city,
            state,
            job_type,
            duties,
            skills,
            contract_length as contractLength,
            working_days as workingDays,
            working_hours as workingHours,
            additional_description as additionalDescription
          FROM job_listings
          WHERE status IN ('Active', 'Deactived')
          ORDER BY date_posted DESC
        `);
        
        return NextResponse.json({
          success: true,
          data: rows
        });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
          success: false,
          message: 'Database error'
        }, { status: 500 });
      } finally {
        if (connection) connection.release();
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action'
    }, { status: 400 });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    if (action === 'create') {
      const body = await request.json();
      
      const {
        title,
        role,
        city,
        state,
        job_type,
        duties,
        skills,
        contract_length,
        working_days,
        working_hours,
        wages,
        additional_description
      } = body;
      
      let connection;
      try {
        connection = await db.getConnection();
        
        // Check if table exists, create if not
        const [tables]: any = await connection.execute(
          `SELECT TABLE_NAME FROM information_schema.TABLES 
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'job_listings'`
        );
        
        if (tables.length === 0) {
          await connection.execute(`
            CREATE TABLE job_listings (
              id INT AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              role VARCHAR(100) NOT NULL,
              city VARCHAR(100),
              state VARCHAR(100),
              job_type VARCHAR(50) DEFAULT 'Contract Role',
              duties TEXT,
              skills TEXT,
              contract_length VARCHAR(50),
              working_days VARCHAR(50),
              working_hours VARCHAR(50),
              wages VARCHAR(100),
              additional_description TEXT,
              status ENUM('Active', 'Deactived', 'Filled', 'Closed') DEFAULT 'Active',
              location VARCHAR(255) GENERATED ALWAYS AS (CONCAT(city, ', ', state)) STORED,
              date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
          `);
        }
        
        const [result]: any = await connection.execute(
          `INSERT INTO job_listings (
            title, role, city, state, job_type, duties, skills, 
            contract_length, working_days, working_hours, wages, additional_description
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            title, role, city, state, job_type, duties, skills,
            contract_length, working_days, working_hours, wages, additional_description
          ]
        );
        
        return NextResponse.json({
          success: true,
          message: 'Job created successfully',
          id: result.insertId
        });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
          success: false,
          message: 'Failed to create job'
        }, { status: 500 });
      } finally {
        if (connection) connection.release();
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action'
    }, { status: 400 });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');
    
    if (action === 'update' && id) {
      const body = await request.json();
      
      const {
        title,
        role,
        city,
        state,
        duties,
        skills,
        contract_length,
        working_days,
        working_hours,
        wages,
        additional_description,
        status
      } = body;
      
      let connection;
      try {
        connection = await db.getConnection();
        
        // Build dynamic update query
        const updateFields = [];
        const values = [];
        
        if (title !== undefined) {
          updateFields.push('title = ?');
          values.push(title);
        }
        if (role !== undefined) {
          updateFields.push('role = ?');
          values.push(role);
        }
        if (city !== undefined) {
          updateFields.push('city = ?');
          values.push(city);
        }
        if (state !== undefined) {
          updateFields.push('state = ?');
          values.push(state);
        }
        if (duties !== undefined) {
          updateFields.push('duties = ?');
          values.push(duties);
        }
        if (skills !== undefined) {
          updateFields.push('skills = ?');
          values.push(skills);
        }
        if (contract_length !== undefined) {
          updateFields.push('contract_length = ?');
          values.push(contract_length);
        }
        if (working_days !== undefined) {
          updateFields.push('working_days = ?');
          values.push(working_days);
        }
        if (working_hours !== undefined) {
          updateFields.push('working_hours = ?');
          values.push(working_hours);
        }
        if (wages !== undefined) {
          updateFields.push('wages = ?');
          values.push(wages);
        }
        if (additional_description !== undefined) {
          updateFields.push('additional_description = ?');
          values.push(additional_description);
        }
        if (status !== undefined) {
          updateFields.push('status = ?');
          values.push(status);
        }
        
        if (updateFields.length === 0) {
          return NextResponse.json({
            success: false,
            message: 'No fields to update'
          }, { status: 400 });
        }
        
        values.push(id);
        
        const query = `UPDATE job_listings SET ${updateFields.join(', ')} WHERE id = ?`;
        
        const [result]: any = await connection.execute(query, values);
        
        if (result.affectedRows === 0) {
          return NextResponse.json({
            success: false,
            message: 'Job not found'
          }, { status: 404 });
        }
        
        return NextResponse.json({
          success: true,
          message: 'Job updated successfully'
        });
      } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
          success: false,
          message: 'Failed to update job'
        }, { status: 500 });
      } finally {
        if (connection) connection.release();
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'Invalid action or missing ID'
    }, { status: 400 });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';