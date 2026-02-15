const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { from_name, from_email, message } = req.body;

    if (!from_name || !from_email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>', // Resend default for unverified domains
            to: ['sridevipsr839@gmail.com'],
            reply_to: from_email,
            subject: `New Message from ${from_name}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${from_name}</p>
                <p><strong>Email:</strong> ${from_email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error('❌ Resend Error:', error);
            return res.status(500).json({ success: false, message: 'Failed to send message.' });
        }

        console.log('✅ Email sent successfully:', data.id);
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        console.error('❌ Server Error:', err);
        res.status(500).json({ success: false, message: 'Server error occurred.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
