const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

const allowedOrigins = [
    'https://mentor-one-beta.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS პოლიტიკით დაბლოკილია'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.post('/api/register', async (req, res) => {
    console.log("--- ახალი მოთხოვნა ---");
    console.log("მონაცემები:", req.body);

    const { firstName, lastName, email, phoneNumber, captchaToken } = req.body;

    if (!captchaToken) {
        return res.status(400).json({ error: "კაპჩის ტოკენი ცარიელია" });
    }

    try {
        const params = new URLSearchParams();
        params.append('secret', process.env.RECAPTCHA_SECRET_KEY);
        params.append('response', captchaToken);

        const googleVerify = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            params
        );

        console.log("Google-ის პასუხი:", googleVerify.data);

        if (!googleVerify.data.success) {
            return res.status(400).json({ 
                error: "კაპჩას ვალიდაცია ვერ გაიარა", 
                details: googleVerify.data["error-codes"] 
            });
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `🚀 ახალი რეგისტრაცია: ${firstName} ${lastName}`,
            html: `
                <div style="font-family: sans-serif; border: 1px solid #c5a059; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #1b263b;">Lawcraft Academy</h2>
                    <p><strong>სტუდენტი:</strong> ${firstName} ${lastName}</p>
                    <p><strong>ელ-ფოსტა:</strong> ${email}</p>
                    <p><strong>ტელეფონი:</strong> ${phoneNumber}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("იმეილი გაიგზავნა წარმატებით!");
        res.status(200).json({ success: true });

    } catch (error) {
        console.error("სერვერის შეცდომა:", error.message);
        res.status(500).json({ error: "სერვერის შიდა შეცდომა" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`სერვერი მუშაობს პორტზე ${PORT}`));