import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/lib/mysql';
import { sendEmail } from '@/app/api/lib/email/send';

// Rate limiting configuration
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // Max 5 submissions per hour

// Clean up old rate limit entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimit.delete(key);
    }
  }
}, 60 * 60 * 1000);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function validateFormData(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Email validation
  if (!data.email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address');
  } else if (data.email.length > 100) {
    errors.push('Email cannot exceed 100 characters');
  }

  // Phone validation (optional)
  if (data.phone && data.phone.trim() !== '') {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,20}$/;
    const cleanPhone = data.phone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.push('Please enter a valid phone number (10-20 digits)');
    }
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.trim().length > 5000) {
    errors.push('Message cannot exceed 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function checkRateLimit(ip: string, email: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const ipKey = `ip:${ip}`;
  const emailKey = `email:${email.toLowerCase()}`;
  
  // Check IP-based rate limiting
  const ipLimit = rateLimit.get(ipKey);
  if (ipLimit && now - ipLimit.timestamp < RATE_LIMIT_WINDOW) {
    if (ipLimit.count >= RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 };
    }
    ipLimit.count++;
  } else {
    rateLimit.set(ipKey, { count: 1, timestamp: now });
  }

  // Check email-based rate limiting
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

async function saveContactSubmission(formData: ContactFormData, ip: string, userAgent: string): Promise<number> {
  let connection;
  try {
    connection = await db.getConnection();
    
    const sql = `
      INSERT INTO contact_submissions 
      (full_name, email, phone_number, message, submitted_at, status, ip_address, user_agent) 
      VALUES (?, ?, ?, ?, NOW(), 'pending', ?, ?)
    `;
    
    const [result]: any = await connection.execute(sql, [
      formData.name.trim(),
      formData.email.trim().toLowerCase(),
      formData.phone ? formData.phone.trim() : null,
      formData.message.trim(),
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

// Generate user confirmation email HTML
function generateUserConfirmationEmail(name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B2C42; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="margin: 0;">Prudent Resources</h2>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <p>Hello <strong style="color: #8b5cf6;">${name}</strong>,</p>
        
        <p>Thank you for contacting <strong>Prudent Resources</strong>. We've received your message and will get back to you as soon as possible.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #68cfa3; margin: 20px 0; border-radius: 4px;">
          <p><strong>What happens next?</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Our team will review your inquiry</li>
            <li>You'll receive a response within 24-48 hours during business days</li>
            <li>We'll provide the information or assistance you requested</li>
          </ul>
        </div>
        
        <p>If you need immediate assistance, please call us at <strong>+1 443 985 5388</strong>.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Best regards,<br>
          <strong>The Prudent Resources Team</strong></p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; font-size: 12px; color: #666; text-align: center;">
        <p>© ${new Date().getFullYear()} Prudent Resources LLC. All rights reserved.</p>
        <p>6340 Security Blvd. Suite 100 #1467, Baltimore, MD 21207</p>
        <p>Phone: +1 443 985 5388 | Email: info@prudentresources.com</p>
      </div>
    </div>
  `;
}

// Generate admin notification email HTML
function generateAdminNotificationEmail(formData: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto;">
      <div style="background: #dc3545; color: white; padding: 15px; border-radius: 5px;">
        <h3 style="margin: 0; display: flex; align-items: center; gap: 10px;">
          📨 New Contact Form Submission
        </h3>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 3px 10px rgba(0,0,0,0.08);">
        <p>A new contact form has been submitted on the Prudent Resources website:</p>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e9ecef;">
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 120px;">Name:</div>
            <div>
              <strong>${formData.name}</strong>
              <span style="display: inline-block; padding: 2px 10px; background: #fff3cd; color: #856404; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 10px;">Pending</span>
            </div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 120px;">Email:</div>
            <div>
              <a href="mailto:${formData.email}" style="color: #1B2C42; text-decoration: none;">
                ${formData.email}
              </a>
            </div>
          </div>
          
          <div style="display: flex; margin-bottom: 10px;">
            <div style="font-weight: bold; color: #1B2C42; min-width: 120px;">Phone:</div>
            <div>${formData.phone || '<em style="color: #6c757d;">Not provided</em>'}</div>
          </div>
          
          <div style="margin-top: 15px;">
            <div style="font-weight: bold; color: #1B2C42; margin-bottom: 5px;">Message:</div>
            <div style="background: white; padding: 15px; border: 1px solid #dee2e6; border-radius: 6px; font-family: monospace; white-space: pre-wrap; max-height: 300px; overflow-y: auto;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap;">
          <a href="mailto:${formData.email}?subject=Re: Your inquiry to Prudent Resources" 
             style="background: #68cfa3; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 8px;">
            ✉️ Reply via Email
          </a>
          
          ${formData.phone ? `
            <a href="tel:${formData.phone.replace(/[^\d+]/g, '')}" 
               style="background: #6c757d; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-flex; align-items: center; gap: 8px;">
              📞 Call ${formData.name.split(' ')[0]}
            </a>
          ` : ''}
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #6c757d; font-size: 14px; text-align: right;">
          Submitted: ${new Date().toLocaleString()}
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  console.log('=== CONTACT FORM API CALLED ===');
  
  try {
    // Get client IP and user agent
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    console.log(`Client IP: ${ip}, User Agent: ${userAgent.substring(0, 50)}...`);

    // Parse the form data
    let formData: ContactFormData;
    try {
      formData = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request format'
        },
        { status: 400 }
      );
    }

    // Rate limiting check
    const rateLimitCheck = checkRateLimit(ip, formData.email);
    if (!rateLimitCheck.allowed) {
      console.warn(`Rate limit exceeded for IP: ${ip}, Email: ${formData.email}`);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many submission attempts. Please try again in an hour.'
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '3600'
          }
        }
      );
    }

    console.log('Form data received:', {
      name: formData.name?.substring(0, 20) + '...',
      email: formData.email,
      hasPhone: !!formData.phone,
      messageLength: formData.message?.length || 0
    });

    // Validate form data
    const validation = validateFormData(formData);
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

    console.log('✅ Form validation passed');

    // Save to database
    let submissionId: number;
    try {
      submissionId = await saveContactSubmission(formData, ip, userAgent);
      console.log(`✅ Data saved to database (ID: ${submissionId})`);
    } catch (dbError) {
      console.error('Database save error:', dbError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Failed to save your message. Please try again later.'
        },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    try {
      const userEmailHtml = generateUserConfirmationEmail(formData.name);
      await sendEmail(formData.email, 'Thank You for Contacting Prudent Resources', userEmailHtml);
      console.log(`✅ Confirmation email sent to user: ${formData.email}`);
    } catch (emailError) {
      console.error('User email error:', emailError);
      // Don't fail the whole request if email fails
    }

    // Send notification email to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'info@prudentresources.com';
      const adminEmailHtml = generateAdminNotificationEmail(formData);
      await sendEmail(adminEmail, `New Contact Submission: ${formData.name}`, adminEmailHtml);
      console.log(`✅ Notification email sent to admin`);
    } catch (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      // Don't fail the whole request if admin email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      submissionId
    }, {
      status: 201,
      headers: {
        'X-RateLimit-Remaining': (rateLimitCheck.remaining - 1).toString()
      }
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to send your message. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const healthCheck = searchParams.get('health');
  const testDb = searchParams.get('testdb');

  if (healthCheck === 'true') {
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
          AND table_name = 'contact_submissions'
        `, [process.env.DB_NAME || 'prudentresource']);
        
        return NextResponse.json({
          success: true,
          status: 'healthy',
          timestamp: new Date().toISOString(),
          database: {
            connected: true,
            name: dbResult[0]?.db,
            serverTime: dbResult[0]?.time,
            tableExists: tableCheck[0]?.count > 0
          }
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

  if (testDb === 'true') {
    try {
      let connection;
      try {
        connection = await db.getConnection();
        
        // Create table if it doesn't exist
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS contact_submissions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone_number VARCHAR(20),
            message TEXT NOT NULL,
            submitted_at DATETIME NOT NULL,
            status ENUM('pending', 'responded', 'archived') DEFAULT 'pending',
            response_notes TEXT,
            responded_at DATETIME,
            ip_address VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_status (status),
            INDEX idx_submitted_at (submitted_at)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `;

        await connection.execute(createTableSQL);
        
        // Insert a test record
        const testData = {
          full_name: 'Test User',
          email: 'test@example.com',
          phone_number: '+1234567890',
          message: 'This is a test submission from the API',
          submitted_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          status: 'pending',
          ip_address: '127.0.0.1',
          user_agent: 'API Test'
        };

        const insertSQL = `
          INSERT INTO contact_submissions 
          (full_name, email, phone_number, message, submitted_at, status, ip_address, user_agent)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [insertResult]: any = await connection.execute(insertSQL, [
          testData.full_name,
          testData.email,
          testData.phone_number,
          testData.message,
          testData.submitted_at,
          testData.status,
          testData.ip_address,
          testData.user_agent
        ]);

        // Get test record count
        const [countResult]: any = await connection.execute('SELECT COUNT(*) as count FROM contact_submissions');
        
        return NextResponse.json({
          success: true,
          message: 'Database test completed successfully',
          tablesCreated: true,
          testRecordInserted: true,
          testRecordId: insertResult.insertId,
          totalRecords: countResult[0]?.count || 0
        });
      } finally {
        if (connection) connection.release();
      }
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: 'Database test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  }

  // Return API information
  return NextResponse.json({
    success: true,
    message: 'Contact API v1.0.0',
    endpoints: {
      POST: '/api/contact',
      GET: {
        healthCheck: '/api/contact?health=true',
        testDatabase: '/api/contact?testdb=true'
      }
    },
    rateLimiting: {
      window: '1 hour',
      maxRequests: RATE_LIMIT_MAX
    }
  });
}

export const dynamic = 'force-dynamic';