const nodemailer = require("nodemailer");

// Send contact email
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
        success: false,
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to support team
    const supportMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.SUPPORT_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6367ff; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="margin-bottom: 15px;">
              <strong>Name:</strong> ${name}
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </div>
            
            ${phone ? `<div style="margin-bottom: 15px;"><strong>Phone:</strong> ${phone}</div>` : ""}
            
            <div style="margin-bottom: 15px;">
              <strong>Subject:</strong> ${subject}
            </div>
            
            <div style="margin-bottom: 15px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #6367ff;">
              <strong>Message:</strong>
              <p>${message.replace(/\n/g, "<br>")}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            
            <p style="color: #999; font-size: 0.9rem; margin-top: 20px;">
              This is an automated message. Please reply directly to ${email} to respond.
            </p>
          </div>
        </div>
      `,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message - Urban Fix Support",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6367ff; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
            
            <p>Dear ${name},</p>
            
            <p>We have received your message and appreciate you reaching out to us. Our support team will review your inquiry and get back to you within 24 hours.</p>
            
            <div style="padding: 15px; background-color: #f0f4ff; border-radius: 10px; margin: 20px 0;">
              <strong>Your Message Summary:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Subject:</strong> ${subject}</li>
                <li><strong>Submitted on:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            </div>
            
            <p>If you need immediate assistance, you can reach our support team at:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Email: <a href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL || process.env.EMAIL_USER}</a></li>
              <li>Phone: +91 7836 923 456 (Mon-Sat, 9 AM - 6 PM IST)</li>
            </ul>
            
            <p style="margin-top: 20px;">Best regards,<br><strong>Urban Fix Support Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
            
            <p style="color: #999; font-size: 0.85rem; text-align: center;">
              © 2024 Urban Fix. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(supportMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      message: "Message sent successfully! We'll get back to you soon.",
      success: true,
      data: {
        name,
        email,
        subject,
      },
    });
  } catch (error) {
    console.error("Contact email error:", error);
    res.status(500).json({
      message: "Failed to send message. Please try again later.",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  sendContactEmail,
};
