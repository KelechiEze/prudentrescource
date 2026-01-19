import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';
import { sendEmail } from '@/app/api/lib/email/send';

// Rate limiting configuration
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const RATE_LIMIT_MAX = 3; // Max 3 submissions per day

// Clean up old rate limit entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.delete(key);
    }
  }
}, 60 * 60 * 1000);

interface ResumeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  position: string;
  hasCpr: string;
  comments: string;
}

function validateFormData(data: ResumeFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.firstName?.trim() || data.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  if (!data.lastName?.trim() || data.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation
  if (!data.phone?.trim()) {
    errors.push('Phone number is required');
  } else if (!/^[\+]?[0-9\s\-\(\)]{10,20}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Please enter a valid phone number (10-20 digits)');
  }

  // Location validation
  if (!data.city?.trim()) {
    errors.push('City is required');
  }
  if (!data.state?.trim()) {
    errors.push('State is required');
  }

  // Position validation
  if (!data.position?.trim()) {
    errors.push('Position is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateFile(file: File | null, type: 'resume' | 'cert'): { isValid: boolean; error?: string } {
  if (type === 'resume' && !file) {
    return { isValid: false, error: 'Resume file is required' };
  }

  if (file) {
    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { isValid: false, error: `${type} file size must be less than 5MB` };
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: `${type} file must be PDF, DOC, DOCX, JPG, or PNG` };
    }
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

// async function saveResumeSubmission(
//   formData: ResumeFormData,
//   resumeFile: File,
//   certFile: File | null,
//   ip: string,
//   userAgent: string
// ): Promise<number> {
//   let connection;
//   try {
//     connection = await db.getConnection();
    
//     // Convert files to buffers for database storage
//     const [resumeBuffer, certBuffer] = await Promise.all([
//       convertFileToBuffer(resumeFile),
//       certFile ? convertFileToBuffer(certFile) : Promise.resolve(null)
//     ]);
    
//     const sql = `
//       INSERT INTO resume_submissions 
//       (first_name, last_name, email, phone, city, state, position, has_cpr,
//        resume_file_name, resume_file_type, resume_file_size, resume_file_content,
//        cert_file_name, cert_file_type, cert_file_size, cert_file_content,
//        comments, ip_address, user_agent, submitted_at, status) 
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')
//     `;
    
//     const [result]: any = await connection.execute(sql, [
//       formData.firstName.trim(),
//       formData.lastName.trim(),
//       formData.email.trim().toLowerCase(),
//       formData.phone.trim(),
//       formData.city.trim(),
//       formData.state.trim(),
//       formData.position.trim(),
//       formData.hasCpr === 'yes' ? 'yes' : 'no',
//       resumeFile.name,
//       resumeFile.type,
//       resumeFile.size,
//       resumeBuffer,
//       certFile?.name || null,
//       certFile?.type || null,
//       certFile?.size || null,
//       certBuffer,
//       formData.comments?.trim() || null,
//       ip,
//       userAgent
//     ]);
    
//     return result.insertId;
//   } catch (error) {
//     console.error('Database save error:', error);
//     throw error;
//   } finally {
//     if (connection) connection.release();
//   }
// }


// Helper to sanitize and truncate file names
// function sanitizeFileName(fileName: string, maxLength = 100) {
//   if (!fileName) return 'unknown';
//   const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
//   let baseName = fileName.replace(/\.[^/.]+$/, '');
//   if (baseName.length > maxLength) {
//     baseName = baseName.slice(0, maxLength);
//   }
//   return ext ? `${baseName}.${ext}` : baseName;
// }


// Helper to sanitize and truncate file names
function sanitizeFileName(fileName: string, maxLength = 100) {
  if (!fileName) return 'unknown';
  const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
  let baseName = fileName.replace(/\.[^/.]+$/, '');
  if (baseName.length > maxLength) {
    baseName = baseName.slice(0, maxLength);
  }
  return ext ? `${baseName}.${ext}` : baseName;
}


// Updated saveResumeSubmission


async function saveResumeSubmission(
  formData: ResumeFormData,
  resumeFile: File,
  certFile: File | null,
  ip: string,
  userAgent: string
): Promise<number> {
  let connection;
  try {
    connection = await db.getConnection();

    // Sanitize file names and add timestamp prefix
    const resumeFileName = `${Date.now()}-${sanitizeFileName(resumeFile.name, 100)}`;
    const certFileName = certFile ? `${Date.now()}-${sanitizeFileName(certFile.name, 100)}` : null;

    // Convert files to buffers for database storage
    const [resumeBuffer, certBuffer] = await Promise.all([
      convertFileToBuffer(resumeFile),
      certFile ? convertFileToBuffer(certFile) : Promise.resolve(null)
    ]);

    const sql = `
      INSERT INTO resume_submissions 
      (first_name, last_name, email, phone, city, state, position, has_cpr,
       resume_file_name, resume_file_type, resume_file_size, resume_file_content,
       cert_file_name, cert_file_type, cert_file_size, cert_file_content,
       comments, ip_address, user_agent, submitted_at, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pending')
    `;

    const [result]: any = await connection.execute(sql, [
      formData.firstName.trim(),
      formData.lastName.trim(),
      formData.email.trim().toLowerCase(),
      formData.phone.trim(),
      formData.city.trim(),
      formData.state.trim(),
      formData.position.trim(),
      formData.hasCpr === 'yes' ? 'yes' : 'no',
      resumeFileName,
      resumeFile.type,
      resumeFile.size,
      resumeBuffer,
      certFileName,
      certFile?.type || null,
      certFile?.size || null,
      certBuffer,
      formData.comments?.trim() || null,
      ip,
      userAgent
    ]);

    return result.insertId;
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}


function generateUserConfirmationEmail(
  firstName: string,
  lastName: string,
  position: string
): string {
  const fullName = `${firstName} ${lastName}`;
  
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B2C42; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0;">Prudent Resources</h2>
        <p style="margin: 5px 0 0; opacity: 0.9;">Career Opportunities</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p>Dear <strong style="color: #8b5cf6;">${fullName}</strong>,</p>
        
        <p>Thank you for submitting your resume for the <strong>${position}</strong> position at <strong>Prudent Resources</strong>.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #68cfa3; margin: 20px 0; border-radius: 4px;">
          <p><strong>📋 Application Received</strong></p>
          <p>We have successfully received your application and will review it carefully.</p>
        </div>
        
        <div style="background: #E3E8DE; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p><strong>What happens next?</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Our recruitment team will review your qualifications</li>
            <li>If your profile matches our requirements, we'll contact you within 5-7 business days</li>
            <li>We may reach out for additional information or to schedule an interview</li>
          </ul>
        </div>
        
        <p><strong>Application Reference:</strong> PR${Date.now().toString().slice(-6)}</p>
        
        <p>If you have any questions about your application, please contact our HR department at <strong>careers@prudentresources.com</strong> or call <strong>+1 443 985 5388</strong>.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Best regards,<br>
          <strong>The Prudent Resources Talent Acquisition Team</strong></p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666; text-align: center;">
        <p>© ${new Date().getFullYear()} Prudent Resources LLC. All rights reserved.</p>
        <p>6340 Security Blvd. Suite 100 #1467, Baltimore, MD 21207</p>
        <p>Phone: +1 443 985 5388 | Email: careers@prudentresources.com</p>
      </div>
    </div>
  `;
}

function generateAdminNotificationEmail(
  formData: ResumeFormData,
  hasCertifications: boolean,
  resumeFileSize: number
): string {
  const fullName = `${formData.firstName} ${formData.lastName}`;
  const fileSizeMB = (resumeFileSize / (1024 * 1024)).toFixed(2);
  
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 15px; border-radius: 5px;">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 10px;">
          📄 New Resume Submission
        </h3>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
        <p>A new resume has been submitted for the position: <strong>${formData.position}</strong></p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e9ecef;">
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Candidate:</div>
            <div>
              <strong>${fullName}</strong>
              <span style="display: inline-block; padding: 2px 10px; background: #fff3cd; color: #856404; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px;">New</span>
            </div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Contact:</div>
            <div>
              <a href="mailto:${formData.email}" style="color: #1B2C42; text-decoration: none;">
                ${formData.email}
              </a><br>
              ${formData.phone}
            </div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Location:</div>
            <div>${formData.city}, ${formData.state}</div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">CPR Certified:</div>
            <div>${formData.hasCpr === 'yes' ? '✅ Yes' : '❌ No'}</div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 150px;">Documents:</div>
            <div>
              📎 Resume (${fileSizeMB} MB)<br>
              ${hasCertifications ? '📎 Certifications attached' : '📎 No certifications'}
            </div>
          </div>
          
          ${formData.comments ? `
            <div style="margin-top: 15px;">
              <div style="font-weight: bold; color: #1B2C42; margin-bottom: 5px;">Comments:</div>
              <div style="background: white; padding: 10px; border: 1px solid #dee2e6; border-radius: 6px; font-style: italic;">
                "${formData.comments}"
              </div>
            </div>
          ` : ''}
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap;">
          <a href="mailto:${formData.email}?subject=Regarding your application for ${formData.position}" 
             style="background: #68cfa3; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 8px;">
            ✉️ Contact Candidate
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
  console.log('=== RESUME SUBMISSION API CALLED ===');
  
  try {
    // Get client IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    console.log(`Client IP: ${ip}`);

    // Parse form data (multipart/form-data)
    const formData = await request.formData();
    
    // Extract form fields
    const resumeFormData: ResumeFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      position: formData.get('position') as string,
      hasCpr: formData.get('hasCpr') as string,
      comments: formData.get('comments') as string
    };

    // Get files
    const resumeFile = formData.get('resume') as File;
    const certFile = formData.get('certifications') as File;

    console.log('Form data extracted:', {
      name: `${resumeFormData.firstName} ${resumeFormData.lastName}`,
      email: resumeFormData.email,
      position: resumeFormData.position,
      resumeFileSize: resumeFile?.size,
      certFileSize: certFile?.size
    });

    // Rate limiting check
    const rateLimitCheck = checkRateLimit(ip, resumeFormData.email);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}, Email: ${resumeFormData.email}`);
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
    const validation = validateFormData(resumeFormData);
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

    // Validate resume file
    const resumeValidation = validateFile(resumeFile, 'resume');
    if (!resumeValidation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: resumeValidation.error
        },
        { status: 400 }
      );
    }

    // Validate certifications file (optional)
    const certValidation = validateFile(certFile, 'cert');
    if (!certValidation.isValid && certFile) {
      return NextResponse.json(
        { 
          success: false, 
          message: certValidation.error
        },
        { status: 400 }
      );
    }

    console.log('✅ Form validation passed');

    // Save to database (files included)
    let submissionId: number;
    try {
      submissionId = await saveResumeSubmission(
        resumeFormData,
        resumeFile,
        certFile,
        ip,
        userAgent
      );
      console.log(`✅ Data saved to database (ID: ${submissionId})`);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to save your application. Please try again later.'
        },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    try {
      const userEmailHtml = generateUserConfirmationEmail(
        resumeFormData.firstName,
        resumeFormData.lastName,
        resumeFormData.position
      );
      await sendEmail(
        resumeFormData.email,
        `Application Received: ${resumeFormData.position}`,
        userEmailHtml
      );
      console.log(`✅ Confirmation email sent to user: ${resumeFormData.email}`);
    } catch (emailError) {
      console.error('User email error:', emailError);
      // Don't fail the whole request if email fails
    }

    // Send notification email to admin/HR
    try {
      const adminEmail = process.env.HR_EMAIL || 'careers@prudentresources.com';
      const adminEmailHtml = generateAdminNotificationEmail(
        resumeFormData,
        !!certFile,
        resumeFile.size
      );
      await sendEmail(
        adminEmail,
        `New Resume: ${resumeFormData.firstName} ${resumeFormData.lastName} - ${resumeFormData.position}`,
        adminEmailHtml
      );
      console.log(`✅ Notification email sent to HR`);
    } catch (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      // Don't fail the whole request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Your resume has been submitted successfully! We will review it and get back to you soon.',
      submissionId,
      referenceNumber: `PR${Date.now().toString().slice(-6)}`
    }, {
      status: 201,
      headers: {
        'X-RateLimit-Remaining': (rateLimitCheck.remaining - 1).toString()
      }
    });
    
  } catch (error) {
    console.error('❌ Resume submission error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to submit your application. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  // Endpoint to download a resume file
  if (action === 'download-resume') {
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Resume ID is required' },
        { status: 400 }
      );
    }

    try {
      let connection;
      try {
        connection = await db.getConnection();
        const [rows]: any = await connection.execute(
          'SELECT resume_file_name, resume_file_type, resume_file_content FROM resume_submissions WHERE id = ?',
          [id]
        );

        if (rows.length === 0) {
          return NextResponse.json(
            { success: false, message: 'Resume not found' },
            { status: 404 }
          );
        }

        const file = rows[0];
        const fileContent = file.resume_file_content;
        
        // Create a response with the file
        return new NextResponse(fileContent, {
          status: 200,
          headers: {
            'Content-Type': file.resume_file_type,
            'Content-Disposition': `attachment; filename="${file.resume_file_name}"`,
            'Cache-Control': 'no-cache',
          },
        });
      } finally {
        if (connection) connection.release();
      }
    } catch (error) {
      console.error('Download error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to download resume' },
        { status: 500 }
      );
    }
  }

  // Endpoint to download a certification file
  if (action === 'download-cert') {
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }

    try {
      let connection;
      try {
        connection = await db.getConnection();
        const [rows]: any = await connection.execute(
          'SELECT cert_file_name, cert_file_type, cert_file_content FROM resume_submissions WHERE id = ?',
          [id]
        );

        if (rows.length === 0 || !rows[0].cert_file_content) {
          return NextResponse.json(
            { success: false, message: 'Certification file not found' },
            { status: 404 }
          );
        }

        const file = rows[0];
        const fileContent = file.cert_file_content;
        
        // Create a response with the file
        return new NextResponse(fileContent, {
          status: 200,
          headers: {
            'Content-Type': file.cert_file_type,
            'Content-Disposition': `attachment; filename="${file.cert_file_name}"`,
            'Cache-Control': 'no-cache',
          },
        });
      } finally {
        if (connection) connection.release();
      }
    } catch (error) {
      console.error('Download error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to download certification' },
        { status: 500 }
      );
    }
  }

  // Endpoint to view submission details (without downloading)
  if (action === 'view') {
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }

    try {
      let connection;
      try {
        connection = await db.getConnection();
        const [rows]: any = await connection.execute(
          `SELECT 
            id, first_name, last_name, email, phone, city, state, position, has_cpr,
            resume_file_name, resume_file_type, resume_file_size,
            cert_file_name, cert_file_type, cert_file_size,
            comments, submitted_at, status, created_at
           FROM resume_submissions WHERE id = ?`,
          [id]
        );

        if (rows.length === 0) {
          return NextResponse.json(
            { success: false, message: 'Submission not found' },
            { status: 404 }
          );
        }

        const submission = rows[0];
        
        // Don't include file content in the response for security
        return NextResponse.json({
          success: true,
          data: {
            ...submission,
            downloadLinks: {
              resume: `/api/resume/submit?action=download-resume&id=${id}`,
              certification: submission.cert_file_name ? `/api/resume/submit?action=download-cert&id=${id}` : null
            }
          }
        });
      } finally {
        if (connection) connection.release();
      }
    } catch (error) {
      console.error('View error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch submission' },
        { status: 500 }
      );
    }
  }

  // Endpoint to list all submissions (for admin panel)
  if (action === 'list') {
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    try {
      let connection;
      try {
        connection = await db.getConnection();
        
        // Get total count
        const [countResult]: any = await connection.execute(
          'SELECT COUNT(*) as total FROM resume_submissions'
        );
        
        // Get paginated submissions (without file content)
        const [rows]: any = await connection.execute(
          `SELECT 
            id, first_name, last_name, email, phone, city, state, position, has_cpr,
            resume_file_name, resume_file_type, resume_file_size,
            cert_file_name, cert_file_type, cert_file_size,
            comments, submitted_at, status, created_at
           FROM resume_submissions 
           ORDER BY submitted_at DESC 
           LIMIT ? OFFSET ?`,
          [limit, offset]
        );

        return NextResponse.json({
          success: true,
          data: rows,
          pagination: {
            page,
            limit,
            total: countResult[0]?.total || 0,
            totalPages: Math.ceil((countResult[0]?.total || 0) / limit)
          }
        });
      } finally {
        if (connection) connection.release();
      }
    } catch (error) {
      console.error('List error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }
  }

  // Health check endpoint
  if (action === 'health') {
    try {
      let connection;
      try {
        connection = await db.getConnection();
        const [dbResult]: any = await connection.execute('SELECT 1 as test, NOW() as time, DATABASE() as db');
        
        // Check if table exists
        const [tableCheck]: any = await connection.execute(`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = ? 
          AND table_name = 'resume_submissions'
        `, [process.env.DB_NAME || 'prudentresource']);
        
        // Get file statistics
        const [stats]: any = await connection.execute(`
          SELECT 
            COUNT(*) as total_submissions,
            SUM(resume_file_size) as total_resume_size_bytes,
            COALESCE(SUM(cert_file_size), 0) as total_cert_size_bytes
          FROM resume_submissions
        `);
        
        return NextResponse.json({
          success: true,
          status: 'healthy',
          timestamp: new Date().toISOString(),
          database: {
            connected: true,
            name: dbResult[0]?.db,
            serverTime: dbResult[0]?.time,
            tableExists: tableCheck[0]?.count > 0
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
    message: 'Resume Submission API v2.0.0',
    endpoints: {
      POST: '/api/resume/submit',
      GET: {
        submit: '/api/resume/submit',
        downloadResume: '/api/resume/submit?action=download-resume&id={id}',
        downloadCert: '/api/resume/submit?action=download-cert&id={id}',
        viewSubmission: '/api/resume/submit?action=view&id={id}',
        listSubmissions: '/api/resume/submit?action=list&page=1&limit=20',
        healthCheck: '/api/resume/submit?action=health'
      }
    },
    features: {
      fileStorage: 'Files stored directly in database',
      maxFileSize: '5MB',
      allowedTypes: ['PDF', 'DOC', 'DOCX', 'JPG', 'PNG'],
      rateLimiting: '3 submissions per day per user/IP'
    }
  });
}

export const dynamic = 'force-dynamic';