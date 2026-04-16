const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config({ path: './info.env' });

const app = express();
app.use(cors());
app.use(express.json());

const SERVER_URL = 'https://mentor-2-8mbm.onrender.com'; 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            subject: `ახალი რეგისტრაცია: ${firstName}`,
            html: `
                <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #1b263b;">LAWCRAFT ACADEMY</h2>
                    <p><strong>მოსწავლე:</strong> ${firstName} ${lastName}</p>
                    <p><strong>ტელეფონი:</strong> ${phoneNumber}</p>
                    <br>
                    <a href="${SERVER_URL}/api/approve?name=${firstName}" 
                       style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">ACCEPT</a>
                    <a href="${SERVER_URL}/api/decline?name=${firstName}" 
                       style="background: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; margin-left: 10px;">DECLINE</a>
                </div>
            `
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/approve', (req, res) => res.send(`<h1 style="color: green; text-align: center;">${req.query.name} დადასტურებულია!</h1>`));
app.get('/api/decline', (req, res) => res.send(`<h1 style="color: red; text-align: center;">${req.query.name} უარყოფილია.</h1>`));

app.listen(5000, () => console.log('Server running on port 5000'));