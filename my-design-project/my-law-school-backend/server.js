const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: ['https://mentor-one-beta.vercel.app', 'http://localhost:5173'],
    methods: ['POST', 'GET'],
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
    const { firstName, lastName, email, phoneNumber, captchaToken } = req.body;
    if (!captchaToken) {
        return res.status(400).json({ error: "კაპჩის ტოკენი აკლია" });
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: captchaToken
                }
            }
        );

        console.log("Google Verify Response:", response.data);

        if (!response.data.success) {
            return res.status(400).json({ 
                error: "კაპჩას შემოწმება ვერ გაიარა", 
                details: response.data['error-codes'] 
            });
        }

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `🚀 LAWCRAFT: ახალი რეგისტრაცია - ${firstName} ${lastName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; border: 2px solid #c5a059; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #1b263b; color: #ffffff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">LAWCRAFT ACADEMY</h2>
                    </div>
                    <div style="padding: 20px; background-color: #fcfcfc;">
                        <p style="font-size: 16px;"><strong>👤 მოსწავლე:</strong> ${firstName} ${lastName}</p>
                        <p style="font-size: 16px;"><strong>📧 ელ-ფოსტა:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p style="font-size: 16px;"><strong>📞 ტელეფონი:</strong> ${phoneNumber}</p>
                    </div>
                    <div style="background-color: #eee; padding: 10px; text-align: center; font-size: 12px; color: #777;">
                        შეტყობინება გამოგზავნილია ავტომატურად.
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent for: ${email}`);
        res.status(200).json({ success: true });

    } catch (error) {
        console.error("სერვერის შეცდომა:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "შიდა სერვერული შეცდომა" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));