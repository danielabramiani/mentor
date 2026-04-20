const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://mentor-one-beta.vercel.app',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:5176'
        ];
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
    console.log("მოთხოვნა მოვიდა:", req.body);

    const { firstName, lastName, email, phoneNumber, captchaToken } = req.body;

    try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
        const googleVerify = await axios.post(verifyUrl);
        console.log("Google-ის პასუხი:", googleVerify.data);
        if (!googleVerify.data.success) {
            return res.status(400).json({ error: "კაპჩას ვალიდაცია ვერ გაიარა" });
        }
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `ახალი რეგისტრაცია: ${firstName} ${lastName}`,
            html: `<h3>ახალი სტუდენტი</h3>
                   <p>სახელი: ${firstName} ${lastName}</p>
                   <p>იმეილი: ${email}</p>
                   <p>ტელეფონი: ${phoneNumber}</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true });

    } catch (error) {
        console.error("შეცდომა სერვერზე:", error);
        res.status(500).json({ error: "სერვერის შიდა შეცდომა" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`სერვერი ჩაირთო პორტზე ${PORT}`));