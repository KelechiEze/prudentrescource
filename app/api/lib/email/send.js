// /lib/email/send.js
import nodemailer from 'nodemailer'
import { wrapEmailHtml } from './template.js'

// create transporter once
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465, // Use 465 for SSL
    secure: true, // Set to true if using port 465
    auth: {
        user: 'notifications@thesocialgoodco.com', // Your Hostinger email
        pass: 'Notifications$$2025' // Your Hostinger email password
    },tls: {
      rejectUnauthorized: false,
    }
  });

/**
 * Send an email using your shared template.
 * @param {string} to       — recipient email address
 * @param {string} subject  — email subject line
 * @param {string} bodyHtml — email body (will be wrapped)
 */
export async function sendEmail(to, subject, bodyHtml) {
  const html = wrapEmailHtml(bodyHtml)
   try {
  const info = await transporter.sendMail({
    from: "notifications@thesocialgoodco.com",  // e.g. '"Your Company" <no-reply@yourcompany.com>'
    to,bcc: "ugwuisaaciu@gmail.com",

    subject,
    html
  })
  console.log(`[sendEmail] ✔ sent to ${to}: ${info.messageId}`)
  return info
  } catch (e) {
     console.log("[sendEmail] Email not sent", e);
       return 

  }
}
