const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
 
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // The URL of your frontend application
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());
 
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any SMTP service
  auth: {
    user: 'nanipuneeth00@gmail.com', // Replace with your email
    pass: 'apie oedr wmda nsty', // Replace with your email password or app password
  },
});
 
app.post('/send-mail', async (req, res) => {
  const { email, name, message } = req.body;
 
  const mailOptions = {
    from: 'nanipuneeth00@gmail.com',
    to: email, // The recipient email
    subject: `Message from ${name}`,
    text: message,
  };
 
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send email: ' + error.message);
  }
});
 
app.listen(5002, () => {
  console.log('Server is running on port 5002');
});