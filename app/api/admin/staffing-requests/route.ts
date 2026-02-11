import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';

export async function GET(request: NextRequest) {
  try {
    let connection;
    try {
      connection = await db.getConnection();
      
      // First check if status column exists
      const [columns]: any = await connection.execute(`
        SHOW COLUMNS FROM staffing_requests LIKE 'status'
      `);
      
      // Add status column to query if it exists
      const statusSelect = columns.length > 0 ? 'sr.status,' : '';
      
      const [requests]: any = await connection.execute(`
        SELECT 
          sr.id,
          sr.first_name as firstName,
          sr.last_name as lastName,
          sr.company_name as companyName,
          sr.email,
          sr.phone,
          sr.city,
          sr.state,
          sr.comments,
          sr.submitted_at as submittedAt,
          sr.job_description_file_name as jobDescriptionFileName,
          sr.job_description_file_type as jobDescriptionFileType,
          sr.job_description_file_size as jobDescriptionFileSize,
          ${statusSelect}
          COALESCE(
            JSON_ARRAYAGG(
              JSON_OBJECT(
                'jobTitle', pr.job_title,
                'hireType', pr.hire_type,
                'positionOrder', pr.position_order
              )
            ),
            JSON_ARRAY()
          ) as positions
        FROM staffing_requests sr
        LEFT JOIN position_requests pr ON sr.id = pr.staffing_request_id
        GROUP BY sr.id
        ORDER BY sr.submitted_at DESC
      `);

      // Handle positions parsing with type check
      const parsedRequests = requests.map((req: any) => {
        const positions = req.positions ? 
          (typeof req.positions === 'string' ? JSON.parse(req.positions) : req.positions) 
          : [];
        
        return {
          ...req,
          status: req.status || 'pending', // Use actual status from DB, fallback to 'pending'
          positions
        };
      });

      return NextResponse.json({
        success: true,
        requests: parsedRequests,
        count: parsedRequests.length
      });

    } finally {
      if (connection) connection.release();
    }
  } catch (error) {
    console.error('Error fetching staffing requests:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to fetch staffing requests',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { requestId, status } = await request.json();

    if (!requestId || !status) {
      return NextResponse.json(
        { success: false, message: 'Request ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'reviewed', 'published', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    let connection;
    try {
      connection = await db.getConnection();
      
      // First check if status column exists
      const [columns]: any = await connection.execute(`
        SHOW COLUMNS FROM staffing_requests LIKE 'status'
      `);
      
      if (columns.length === 0) {
        // Add status column if it doesn't exist
        await connection.execute(`
          ALTER TABLE staffing_requests 
          ADD COLUMN status ENUM('pending', 'reviewed', 'published', 'rejected') DEFAULT 'pending'
        `);
      }
      
      // Update the status in the database
      const [result]: any = await connection.execute(
        'UPDATE staffing_requests SET status = ? WHERE id = ?',
        [status, requestId]
      );
      
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { success: false, message: 'Request not found' },
          { status: 404 }
        );
      }
      
      // Fetch the updated record
      const [updatedRows]: any = await connection.execute(
        'SELECT * FROM staffing_requests WHERE id = ?',
        [requestId]
      );

      return NextResponse.json({
        success: true,
        message: 'Status updated successfully',
        request: updatedRows[0]
      });

    } finally {
      if (connection) connection.release();
    }
  } catch (error) {
    console.error('Error updating request status:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to update status',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}