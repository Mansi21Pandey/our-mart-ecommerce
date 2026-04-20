const db = require('../config/database');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Submit contact message
const submitContact = async(req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save to database
        const [result] = await db.query(
            'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message]
        );

        // Send email notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Contact Message from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
};

// Get all contact messages (admin only)
const getMessages = async(req, res) => {
    try {
        const [messages] = await db.query(
            'SELECT * FROM contact_messages ORDER BY created_at DESC'
        );
        res.json({ success: true, messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { submitContact, getMessages };