# Contact Page Setup Guide

## Overview

A modern, fully responsive Contact Page with:

- ✅ Contact form with validation
- ✅ Contact information cards
- ✅ Social media links
- ✅ FAQ accordion section
- ✅ Email notifications
- ✅ Framer Motion animations
- ✅ Modern UI/UX design

## Features Implemented

### Frontend (React)

- **Location**: `client/worker-booking-front/src/pages/Contact.jsx`
- **Route**: `/contact`
- **Components Used**:
  - React Bootstrap (Container, Card, Form, Accordion)
  - Framer Motion for animations
  - Toast notifications for user feedback

### Backend (Node.js/Express)

- **Contact Controller**: `server/controllers/contactcontroller.js`
- **Contact Routes**: `server/routes/contactRoutes.js`
- **API Endpoint**: `POST /contact/send`
- **Email Service**: Nodemailer

## Setup Instructions

### 1. Install Nodemailer (if not already installed)

```bash
cd server
npm install nodemailer
```

### 2. Configure Environment Variables

Add these variables to your `.env` file in the server directory:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
SUPPORT_EMAIL=support@workerbooking.com
```

### 3. Gmail Setup (if using Gmail)

#### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification

#### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character password
4. Use this password as `EMAIL_PASSWORD` in your .env file

#### Step 3: Update .env

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # 16-character password from Google
SUPPORT_EMAIL=support@workerbooking.com
```

### 4. Alternative Email Services

#### Using SendGrid

```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_USER=noreply@workerbooking.com
SUPPORT_EMAIL=support@workerbooking.com
```

#### Using Outlook/Hotmail

```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
SUPPORT_EMAIL=support@workerbooking.com
```

## File Structure

```
Frontend:
- src/pages/Contact.jsx          (Contact page component)
- src/App.jsx                    (Route added)
- src/components/Navcompo.jsx   (Navigation link added)

Backend:
- server/controllers/contactcontroller.js  (Email logic)
- server/routes/contactRoutes.js          (API endpoints)
- server/server.js                        (Route integration)
```

## API Endpoint

### Send Contact Message

**Endpoint**: `POST /contact/send`

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "subject": "General Inquiry",
  "message": "I have a question about your services..."
}
```

**Response Success** (200):

```json
{
  "message": "Message sent successfully! We'll get back to you soon.",
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "General Inquiry"
  }
}
```

**Response Error** (400/500):

```json
{
  "message": "Error message here",
  "success": false
}
```

## Contact Page Sections

### 1. Hero Section

- Background image
- Title: "Get In Touch"
- Descriptive text
- Smooth animations

### 2. Contact Information Cards

- Email with response time
- Phone with hours
- Physical address
- Support availability

### 3. Contact Form

- Name field (required)
- Email field (required, validated)
- Phone field (optional)
- Subject dropdown (7 categories)
- Message textarea (required)
- Submit button with loading state

### 4. Social Media Links

- Facebook
- Instagram
- Twitter/X
- LinkedIn
- Animated hover effects

### 5. FAQ Accordion Section

- 6 common questions
- Expandable/collapsible answers
- Search-friendly

## Email Templates

The contact form sends two emails:

### 1. Support Team Email

- Receives all contact form submissions
- Formatted with contact information
- Message highlighted
- Instructions to reply directly to user

### 2. User Confirmation Email

- Confirms receipt of their message
- Shows submission summary
- Provides support contact information
- Sets expectations for response time

## Customization

### Colors

- Primary: `#6367ff` (Indigo)
- Secondary: `#f0f4ff` (Light indigo)
- Text: `#333` (Dark gray)
- Muted: `#666` (Medium gray)

### Contact Information

Edit these in `Contact.jsx`:

```javascript
const contactInfo = [
  {
    icon: "📧",
    title: "Email",
    detail: "support@workerbooking.com",
    description: "We reply within 24 hours",
  },
  // ... more entries
];
```

### FAQ Questions

Edit the `faqs` array in `Contact.jsx` to add/modify questions and answers.

### Social Media Links

Edit the `socialLinks` array to add your actual URLs:

```javascript
const socialLinks = [
  { name: "Facebook", icon: "f", url: "https://facebook.com/your-page" },
  // ... more entries
];
```

## Testing

### Test the Contact Form

1. Navigate to `/contact` in your app
2. Fill in the form with test data
3. Click "Send Message"
4. Check that:
   - Success message appears
   - Email is received
   - Form resets
   - Confirmation email is sent to user

### Test Email Sending

Use this test endpoint in your browser console or Postman:

```bash
curl -X POST http://localhost:5000/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Emails not sending

1. Check .env file has correct email credentials
2. Verify EMAIL_USER and EMAIL_PASSWORD are correct
3. For Gmail, ensure you're using 16-character App Password, not your regular password
4. Check server console for error messages

### "Less secure app access" error (Gmail)

- This error is resolved by using App Passwords instead of regular password

### CORS errors

- Already handled in server.js with `cors({ origin: "*" })`

### Validation errors

- All fields marked with \* are required
- Email format is validated
- Phone number can be any format

## Future Enhancements

Possible improvements:

- ✅ Add file upload for attachments
- ✅ Integrate with ticketing system
- ✅ Add priority levels to inquiries
- ✅ Store messages in database
- ✅ Add admin panel to view/respond to messages
- ✅ Implement rate limiting to prevent spam
- ✅ Add reCAPTCHA for bot protection
- ✅ SMS notifications for urgent inquiries

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review error messages in server console
3. Verify .env configuration
4. Check that Nodemailer is installed: `npm list nodemailer`

---

**Contact Page Created**: May 29, 2026
**Last Updated**: May 29, 2026
