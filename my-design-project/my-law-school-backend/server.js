const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, captchaToken } = req.body;

    try {
        const googleVerify = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
        );

        if (!googleVerify.data.success) {
            return res.status(400).json({ error: "კაპჩას შემოწმება ვერ გაიარა" });
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `ახალი რეგისტრაცია: ${firstName} ${lastName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; border: 2px solid #c5a059; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #1b263b; color: #ffffff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">LAWCRAFT ACADEMY</h2>
                    </div>
                    <div style="padding: 20px; background-color: #fcfcfc;">
                        <p style="font-size: 16px;"><strong>👤 მოსწავლე:</strong> ${firstName} ${lastName}</p>
                        <p style="font-size: 16px;"><strong>📧 ელ-ფოსტა:</strong> <a href="mailto:${email}" style="color: #c5a059; text-decoration: none; font-weight: bold;">${email}</a></p>
                        <p style="font-size: 16px;"><strong>📞 ტელეფონი:</strong> ${phoneNumber}</p>
                    </div>
                    <div style="background-color: #eee; padding: 10px; text-align: center; font-size: 12px; color: #777;">
                        შეტყობინება გამოგზავნილია ავტომატურად.
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email details sent for: ${email}`);

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "სერვერის შეცდომა ან მეილი ვერ გაიგზავნა" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));