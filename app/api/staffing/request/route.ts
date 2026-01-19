import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';
import { sendEmail } from '@/app/api/lib/email/send';

// Rate limiting configuration
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_MAX = 3; // Max 3 requests per day

// Clean up old rate limit entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.delete(key);
    }
  }
}, 60 * 60 * 1000);

interface PositionRequest {
  jobTitle: string;
  hireType: string;
}

interface StaffingFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  positions: PositionRequest[];
  comments: string;
}

function validateFormData(data: StaffingFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Company contact validation
  if (!data.firstName?.trim() || data.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  if (!data.lastName?.trim() || data.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }
  if (!data.companyName?.trim()) {
    errors.push('Company name is required');
  }
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }
  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!/^[\+]?[0-9\s\-\(\)]{10,20}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Please enter a valid phone number (10-20 digits)');
  }
  if (!data.city?.trim()) {
    errors.push('City is required');
  }
  if (!data.state?.trim()) {
    errors.push('State is required');
  }

  // Position validation
  if (!data.positions || data.positions.length === 0) {
    errors.push('At least one position is required');
  } else {
    data.positions.forEach((pos, index) => {
      if (!pos.jobTitle?.trim()) {
        errors.push(`Position ${index + 1}: Job title is required`);
      }
      if (!pos.hireType?.trim()) {
        errors.push(`Position ${index + 1}: Hire type is required`);
      }
    });
  }

  // Comments validation (optional)
  if (data.comments && data.comments.length > 5000) {
    errors.push('Comments cannot exceed 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateFile(file: File | null): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: false, error: 'Job description file is required' };
  }

  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  // Check file type
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'text/plain'
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File must be PDF, DOC, DOCX, JPG, PNG, or TXT' };
  }

  return { isValid: true };
}

function checkRateLimit(ip: string, email: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const ipKey = `ip:${ip}`;
  const emailKey = `email:${email.toLowerCase()}`;
  
  const ipLimit = rateLimit.get(ipKey);
  if (ipLimit && now - ipLimit.timestamp < RATE_LIMIT_WINDOW) {
    if (ipLimit.count >= RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 };
    }
    ipLimit.count++;
  } else {
    rateLimit.set(ipKey, { count: 1, timestamp: now });
  }

  const emailLimit = rateLimit.get(emailKey);
  if (emailLimit && now - emailLimit.timestamp < RATE_LIMIT_WINDOW) {
    if (emailLimit.count >= RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 };
    }
    emailLimit.count++;
  } else {
    rateLimit.set(emailKey, { count: 1, timestamp: now });
  }

  const remaining = RATE_LIMIT_MAX - Math.max(
    rateLimit.get(ipKey)?.count || 0,
    rateLimit.get(emailKey)?.count || 0
  );

  return { allowed: true, remaining };
}

async function convertFileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// async function saveStaffingRequest(
//   formData: StaffingFormData,
//   jobDescriptionFile: File,
//   ip: string,
//   userAgent: string
// ): Promise<number> {
//   let connection;
//   try {
//     connection = await db.getConnection();
    
//     // Start transaction
//     await connection.beginTransaction();
    
//     // Convert file to buffer
//     const fileBuffer = await convertFileToBuffer(jobDescriptionFile);
    
//     // Save staffing request
//     const requestSql = `
//       INSERT INTO staffing_requests 
//       (first_name, last_name, company_name, email, phone, city, state,
//        job_description_file_name, job_description_file_type, job_description_file_size, job_description_file_content,
//        comments, ip_address, user_agent, submitted_at, status) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')
//     `;
    
//     const [requestResult]: any = await connection.execute(requestSql, [
//       formData.firstName.trim(),
//       formData.lastName.trim(),
//       formData.companyName.trim(),
//       formData.email.trim().toLowerCase(),
//       formData.phone.trim(),
//       formData.city.trim(),
//       formData.state.trim(),
//       jobDescriptionFile.name,
//       jobDescriptionFile.type,
//       jobDescriptionFile.size,
//       fileBuffer,
//       formData.comments?.trim() || null,
//       ip,
//       userAgent
//     ]);
    
//     const staffingRequestId = requestResult.insertId;
    
//     // Save position requests
//     const positionSql = `
//       INSERT INTO position_requests (staffing_request_id, job_title, hire_type, position_order)
//       VALUES (?, ?, ?, ?)
//     `;
    
//     for (let i = 0; i < formData.positions.length; i++) {
//       const position = formData.positions[i];
//       await connection.execute(positionSql, [
//         staffingRequestId,
//         position.jobTitle.trim(),
//         position.hireType,
//         i + 1
//       ]);
//     }
    
//     // Log the request
//     await connection.execute(
//       `INSERT INTO staffing_request_logs (staffing_request_id, email, action, details, ip_address)
//        VALUES (?, ?, ?, ?, ?)`,
//       [staffingRequestId, formData.email, 'submission', 'New staffing request submitted', ip]
//     );
    
//     // Commit transaction
//     await connection.commit();
    
//     return staffingRequestId;
//   } catch (error) {
//     // Rollback transaction on error
//     if (connection) {
//       await connection.rollback();
//     }
//     console.error('Database save error:', error);
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// }
// --- Helper to sanitize and truncate file names ---
function sanitizeFileName(fileName: string, maxLength = 100) {
  if (!fileName) return 'unknown';
  const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
  let baseName = fileName.replace(/\.[^/.]+$/, '');
  if (baseName.length > maxLength) {
    baseName = baseName.slice(0, maxLength);
  }
  return ext ? `${baseName}.${ext}` : baseName;
}


// --- Updated saveStaffingRequest ---
async function saveStaffingRequest(
  formData: StaffingFormData,
  jobDescriptionFile: File,
  ip: string,
  userAgent: string
): Promise<number> {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Sanitize file name and add timestamp
    const jobDescFileName = `${Date.now()}-${sanitizeFileName(jobDescriptionFile.name, 100)}`;

    // Convert file to buffer
    const fileBuffer = await convertFileToBuffer(jobDescriptionFile);

    const requestSql = `
      INSERT INTO staffing_requests 
      (first_name, last_name, company_name, email, phone, city, state,
       job_description_file_name, job_description_file_type, job_description_file_size, job_description_file_content,
       comments, ip_address, user_agent, submitted_at, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')
    `;

    const [requestResult]: any = await connection.execute(requestSql, [
      formData.firstName.trim(),
      formData.lastName.trim(),
      formData.companyName.trim(),
      formData.email.trim().toLowerCase(),
      formData.phone.trim(),
      formData.city.trim(),
      formData.state.trim(),
      jobDescFileName,
      jobDescriptionFile.type,
      jobDescriptionFile.size,
      fileBuffer,
      formData.comments?.trim() || null,
      ip,
      userAgent
    ]);

    const staffingRequestId = requestResult.insertId;

    // Save positions
    const positionSql = `
      INSERT INTO position_requests (staffing_request_id, job_title, hire_type, position_order)
      VALUES (?, ?, ?, ?)
    `;
    for (let i = 0; i < formData.positions.length; i++) {
      const position = formData.positions[i];
      await connection.execute(positionSql, [
        staffingRequestId,
        position.jobTitle.trim(),
        position.hireType,
        i + 1
      ]);
    }

    // Log the request
    await connection.execute(
      `INSERT INTO staffing_request_logs (staffing_request_id, email, action, details, ip_address)
       VALUES (?, ?, ?, ?, ?)`,
      [staffingRequestId, formData.email, 'submission', 'New staffing request submitted', ip]
    );

    await connection.commit();
    return staffingRequestId;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Database save error:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}





function generateClientConfirmationEmail(
  firstName: string,
  lastName: string,
  companyName: string,
  positions: PositionRequest[]
): string {
  const fullName = `${firstName} ${lastName}`;
  const positionList = positions.map((pos, index) => 
    `<li><strong>${pos.jobTitle}</strong> (${pos.hireType})</li>`
  ).join('');
  
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B2C42; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0;">Prudent Resources</h2>
        <p style="margin: 5px 0 0; opacity: 0.9;">Staffing Solutions</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p>Dear <strong style="color: #8b5cf6;">${fullName}</strong>,</p>
        
        <p>Thank you for submitting your staffing request for <strong>${companyName}</strong>.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #68cfa3; margin: 20px 0; border-radius: 4px;">
          <p><strong>📋 Staffing Request Received</strong></p>
          <p>We have successfully received your request for the following positions:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${positionList}
          </ul>
        </div>
        
        <div style="background: #E3E8DE; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p><strong>Next Steps:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Our staffing specialists will review your requirements</li>
            <li>We'll analyze the job descriptions and position details</li>
            <li>A staffing coordinator will contact you within 24-48 business hours</li>
            <li>We'll provide a timeline and process for filling your positions</li>
          </ul>
        </div>
        
        <p><strong>Request Reference:</strong> SR${Date.now().toString().slice(-8)}</p>
        
        <p>If you have any questions or need to provide additional information, please contact our staffing team at <strong>staffing@prudentresources.com</strong> or call <strong>+1 443 985 5388</strong>.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Best regards,<br>
          <strong>The Prudent Resources Staffing Team</strong></p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666; text-align: center;">
        <p>© ${new Date().getFullYear()} Prudent Resources LLC. All rights reserved.</p>
        <p>6340 Security Blvd. Suite 100 #1467, Baltimore, MD 21207</p>
        <p>Phone: +1 443 985 5388 | Email: staffing@prudentresources.com</p>
      </div>
    </div>
  `;
}

function generateStaffNotificationEmail(
  formData: StaffingFormData,
  jobDescriptionFile: File
): string {
  const fullName = `${formData.firstName} ${formData.lastName}`;
  const positionCount = formData.positions.length;
  const fileSizeMB = (jobDescriptionFile.size / (1024 * 1024)).toFixed(2);
  
  const positionList = formData.positions.map((pos, index) => `
    <div style="padding: 8px 12px; background: #f8f9fa; border-radius: 4px; margin: 5px 0;">
      <strong>${index + 1}. ${pos.jobTitle}</strong> - ${pos.hireType}
    </div>
  `).join('');
  
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 15px; border-radius: 5px;">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 10px;">
          📋 New Staffing Request
        </h3>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
        <p>A new staffing request has been submitted:</p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e9ecef;">
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Client:</div>
            <div>
              <strong>${fullName}</strong>
              <span style="display: inline-block; padding: 2px 10px; background: #fff3cd; color: #856404; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px;">New Request</span>
            </div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Company:</div>
            <div>
              <strong>${formData.companyName}</strong>
            </div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Contact:</div>
            <div>
              <a href="mailto:${formData.email}" style="color: #1B2C42; text-decoration: none;">
                ${formData.email}
              </a><br>
              ${formData.phone}<br>
              ${formData.city}, ${formData.state}
            </div>
          </div>
          
          <div style="margin-top: 15px;">
            <div style="font-weight: bold; color: #1B2C42; margin-bottom: 5px;">Positions Requested (${positionCount}):</div>
            ${positionList}
          </div>
          
          <div style="display: flex; margin-top: 15px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Job Description:</div>
            <div>
              📎 ${jobDescriptionFile.name} (${fileSizeMB} MB)
            </div>
          </div>
          
          ${formData.comments ? `
            <div style="margin-top: 15px;">
              <div style="font-weight: bold; color: #1B2C42; margin-bottom: 5px;">Additional Comments:</div>
              <div style="background: white; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; font-style: italic;">
                "${formData.comments}"
              </div>
            </div>
          ` : ''}
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap;">
          <a href="mailto:${formData.email}?subject=Regarding your staffing request for ${formData.companyName}" 
             style="background: #68cfa3; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 8px;">
            ✉️ Contact Client
          </a>
          
          <a href="tel:${formData.phone.replace(/[^\d+]/g, '')}" 
             style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 8px;">
            📞 Call ${formData.firstName}
          </a>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #6c757d; font-size: 14px; text-align: right;">
          Submitted: ${new Date().toLocaleString()}
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  console.log('=== STAFFING REQUEST API CALLED ===');
  
  try {
    // Get client IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    console.log(`Client IP: ${ip}`);

    // Parse form data
    const formData = await request.formData();
    
    // Extract form fields
    const staffingFormData: StaffingFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      companyName: formData.get('companyName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      comments: formData.get('comments') as string,
      positions: []
    };

    // Extract positions
    const positionCount = parseInt(formData.get('positionCount') as string || '1');
    for (let i = 0; i < positionCount; i++) {
      const jobTitle = formData.get(`positions[${i}].jobTitle`) as string;
      const hireType = formData.get(`positions[${i}].hireType`) as string;
      
      if (jobTitle && hireType) {
        staffingFormData.positions.push({
          jobTitle,
          hireType
        });
      }
    }

    // Get file
    const jobDescriptionFile = formData.get('jobDescription') as File;

    console.log('Form data extracted:', {
      name: `${staffingFormData.firstName} ${staffingFormData.lastName}`,
      company: staffingFormData.companyName,
      email: staffingFormData.email,
      positions: staffingFormData.positions.length,
      fileSize: jobDescriptionFile?.size
    });

    // Rate limiting check
    const rateLimitCheck = checkRateLimit(ip, staffingFormData.email);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}, Email: ${staffingFormData.email}`);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many submission attempts. Please try again tomorrow.'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '86400' // 24 hours in seconds
          }
        }
      );
    }

    // Validate form data
    const validation = validateFormData(staffingFormData);
    if (!validation.isValid) {
      console.warn('Validation failed:', validation.errors);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please fix the following errors:',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Validate file
    const fileValidation = validateFile(jobDescriptionFile);
    if (!fileValidation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: fileValidation.error
        },
        { status: 400 }
      );
    }

    console.log('✅ Form validation passed');

    // Save to database
    let requestId: number;
    try {
      requestId = await saveStaffingRequest(
        staffingFormData,
        jobDescriptionFile,
        ip,
        userAgent
      );
      console.log(`✅ Data saved to database (ID: ${requestId})`);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to save your staffing request. Please try again later.'
        },
        { status: 500 }
      );
    }

    // Send confirmation email to client
    try {
      const clientEmailHtml = generateClientConfirmationEmail(
        staffingFormData.firstName,
        staffingFormData.lastName,
        staffingFormData.companyName,
        staffingFormData.positions
      );
      await sendEmail(
        staffingFormData.email,
        `Staffing Request Received: ${staffingFormData.companyName}`,
        clientEmailHtml
      );
      console.log(`✅ Confirmation email sent to client: ${staffingFormData.email}`);
    } catch (emailError) {
      console.error('Client email error:', emailError);
      // Don't fail the whole request if email fails
    }

    // Send notification email to staffing team
    try {
      const staffEmail = process.env.STAFFING_EMAIL || 'staffing@prudentresources.com';
      const staffEmailHtml = generateStaffNotificationEmail(
        staffingFormData,
        jobDescriptionFile
      );
      await sendEmail(
        staffEmail,
        `New Staffing Request: ${staffingFormData.companyName}`,
        staffEmailHtml
      );
      console.log(`✅ Notification email sent to staffing team`);
    } catch (staffEmailError) {
      console.error('Staff email error:', staffEmailError);
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Your staffing request has been submitted successfully! We will contact you within 24-48 business hours.',
      requestId,
      referenceNumber: `SR${Date.now().toString().slice(-8)}`,
      positionsCount: staffingFormData.positions.length
    }, {
      status: 201,
      headers: {
        'X-RateLimit-Remaining': (rateLimitCheck.remaining - 1).toString()
      }
    });
    
  } catch (error) {
    console.error('❌ Staffing request error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to submit your staffing request. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  // Endpoint to download job description file
 // --- Updated download in GET ---
if (action === 'download-job-description') {
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, message: 'Request ID is required' }, { status: 400 });
  }

  try {
    let connection;
    try {
      connection = await db.getConnection();
      const [rows]: any = await connection.execute(
        `SELECT job_description_file_name, job_description_file_type, job_description_file_content 
         FROM staffing_requests WHERE id = ?`,
        [id]
      );

      if (rows.length === 0) {
        return NextResponse.json({ success: false, message: 'Staffing request not found' }, { status: 404 });
      }

      const file = rows[0];
      const fileContent = file.job_description_file_content;

      // Ensure filename is safe for download
      const safeFileName = sanitizeFileName(file.job_description_file_name, 100);

      return new NextResponse(fileContent, {
        status: 200,
        headers: {
          'Content-Type': file.job_description_file_type,
          'Content-Disposition': `attachment; filename="${safeFileName}"`,
          'Cache-Control': 'no-cache'
        },
      });
    } finally {
      if (connection) connection.release();
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ success: false, message: 'Failed to download job description' }, { status: 500 });
  }
}

  // Health check endpoint
  if (action === 'health') {
    try {
      let connection;
      try {
        connection = await db.getConnection();
        const [dbResult]: any = await connection.execute('SELECT 1 as test, NOW() as time, DATABASE() as db');
        
        // Check if tables exist
        const [staffingTable]: any = await connection.execute(`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = ? 
          AND table_name = 'staffing_requests'
        `, [process.env.DB_NAME || 'prudentresource']);
        
        const [positionsTable]: any = await connection.execute(`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = ? 
          AND table_name = 'position_requests'
        `, [process.env.DB_NAME || 'prudentresource']);
        
        // Get statistics
        const [stats]: any = await connection.execute(`
          SELECT 
            COUNT(DISTINCT sr.id) as total_requests,
            COUNT(pr.id) as total_positions,
            COALESCE(SUM(sr.job_description_file_size), 0) as total_file_size_bytes
          FROM staffing_requests sr
          LEFT JOIN position_requests pr ON sr.id = pr.staffing_request_id
        `);
        
        return NextResponse.json({
          success: true,
          status: 'healthy',
          timestamp: new Date().toISOString(),
          database: {
            connected: true,
            name: dbResult[0]?.db,
            serverTime: dbResult[0]?.time,
            tablesExist: {
              staffing_requests: staffingTable[0]?.count > 0,
              position_requests: positionsTable[0]?.count > 0
            }
          },
          statistics: stats[0] || {}
        });
      } finally {
        if (connection) connection.release();
      }
    } catch (error) {
      return NextResponse.json({
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          connected: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }, { status: 500 });
    }
  }

  // Default: return API info
  return NextResponse.json({
    success: true,
    message: 'Staffing Request API v1.0.0',
    endpoints: {
      POST: '/api/staffing/request',
      GET: {
        downloadJobDescription: '/api/staffing/request?action=download-job-description&id={id}',
        healthCheck: '/api/staffing/request?action=health'
      }
    },
    features: {
      fileStorage: 'Files stored directly in database',
      maxFileSize: '5MB',
      allowedTypes: ['PDF', 'DOC', 'DOCX', 'JPG', 'PNG', 'TXT'],
      rateLimiting: '3 requests per day per client/IP'
    }
  });
}

export const dynamic = 'force-dynamic';