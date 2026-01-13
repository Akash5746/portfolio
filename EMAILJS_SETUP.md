# EmailJS Setup Instructions

The contact form is now configured to send emails to: **akashmi5746@gmail.com**

## Setup Steps:

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. **Create an Email Service**
   - In the EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose Gmail (or your preferred email provider)
   - Connect your email account
   - Note down the **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:

   ```
   Subject: New Message from {{from_name}}
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```

   - Save the template and note down the **Template ID**

4. **Get Your Public Key**
   - Go to "Account" > "General"
   - Find your **Public Key**

5. **Update the Code**
   - In `app/page.tsx`, find the `handleSubmit` function
   - Replace these values with your own:
     ```javascript
     const serviceId = "YOUR_SERVICE_ID";
     const templateId = "YOUR_TEMPLATE_ID";
     const publicKey = "YOUR_PUBLIC_KEY";
     ```

## Current Configuration:

The form includes:
- ✅ Email validation
- ✅ Required field validation
- ✅ Loading state during submission
- ✅ Success toast notification
- ✅ Error handling with toast notification
- ✅ Form reset after successful submission
- ✅ Styled toast matching your UI theme

## Test the Form:

After setup, test by:
1. Filling out all fields
2. Clicking "Send Message"
3. Check for success toast
4. Verify email arrives at akashmi5746@gmail.com
