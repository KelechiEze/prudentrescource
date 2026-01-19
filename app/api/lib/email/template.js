// /lib/email/template.js

// Shared CSS & layout
const globalStyles = `
  <style>
    body { margin:0; padding:0; background:#ecf0f1; font-family:'Inter', Arial, sans-serif; }
    .container { max-width:600px; margin:0 auto; background:#fff; }
    .header { background:#2a5298; color:#fff; text-align:center; padding:20px; }
    .body { padding:30px; color:#333; line-height:1.6; }
    .footer { background:#f8f9fa; color:#666; text-align:center; padding:20px; font-size:14px; }
    a { color:#2a5298; text-decoration:none; }
    .button { background:#2a5298; color:white; padding:12px 24px; text-decoration:none; border-radius:6px; display:inline-block; }
    .info-box { background:#f8f9fa; padding:15px; border-radius:8px; margin:15px 0; border-left:4px solid #2a5298; }
    .urgent { background:#fef2f2; border-left-color:#dc2626; }
  </style>
`

const headerHtml = `x
  <div class="header">
    <h1 style="margin:0; font-size:24px;">Takeover Training Program</h1>
    <p style="margin:5px 0 0 0; opacity:0.9;">Support Center</p>
  </div>
`

const footerHtml = `
  <div class="footer">
    <p>Takeover Training Program Support Team</p>
    <p>Email: support@takeovertraining.com | Website: takeovertraining.com</p>
    <p style="margin-top:10px; font-size:12px; opacity:0.7;">
      This is an automated message. Please do not reply to this email.
    </p>
  </div>
`

/**
 * Wrap your message body in the shared header/footer.
 */
export function wrapEmailHtml(bodyHtml) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      ${globalStyles}
    </head>
    <body>
      <div class="container">
      
        <div class="body">
          ${bodyHtml}
        </div>
       
      </div>
    </body>
    </html>
  `
}