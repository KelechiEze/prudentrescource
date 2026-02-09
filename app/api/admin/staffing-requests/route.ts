import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';

export async function GET(request: NextRequest) {
  try {
    let connection;
    try {
      connection = await db.getConnection();
      
      // Simple query without reference_number column
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

      // Parse positions JSON and add default status
      const parsedRequests = requests.map((req: any) => ({
        ...req,
        status: 'pending', // Default status
        positions: req.positions ? JSON.parse(req.positions) : []
      }));

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
      
      // Update status in the frontend state only
      // Since we don't have status column in DB yet
      // We'll just return success for now
      // TODO: Add status column to database when needed

      return NextResponse.json({
        success: true,
        message: 'Status updated in frontend state',
        note: 'Database update will be available after adding status column'
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