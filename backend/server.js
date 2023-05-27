const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { randomInt } = require('crypto');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Set up the MongoDB connection using Mongoose
mongoose.connect('mongodb+srv://ictakpjtteam2:abcd1234@cluster0.lvcvrya.mongodb.net/curriculum_tracker?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB', error));

// Define a schema for OTP
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // OTP will expire after 5 minutes (300 seconds)
  }
});

// Create an OTP model based on the schema
const OTP = mongoose.model('OTP', otpSchema);

// Set up routes for OTP authentication
app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;

  // Generate a random 6-digit OTP
  const otp = randomInt(100000, 999999);

  // Save the OTP to MongoDB
  const otpData = new OTP({ email, otp });
  otpData.save()
    .then(() => {
      console.log('OTP saved to MongoDB');

      // Configure the email transport
      const transporter = nodemailer.createTransport({
        service: 'your_email_service_provider', // e.g., 'gmail'
        auth: {
          user: 'your_email_address',
          pass: 'your_email_password'
        }
      });

      // Set up the email options
      const mailOptions = {
        from: 'your_email_address',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending OTP email:', error);
          res.status(500).json({ message: 'Failed to send OTP email' });
        } else {
          console.log('OTP email sent:', info.response);
          res.status(200).json({ message: 'OTP email sent successfully' });
        }
      });
    })
    .catch((error) => {
      console.error('Error saving OTP to MongoDB', error);
      res.status(500).json({ message: 'Failed to save OTP' });
    });
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Find the OTP document in the database
  OTP.findOne({ email, otp })
    .then((otpData) => {
      if (otpData) {
        // OTP matched, redirect to the welcome page
        res.status(200).json({ message: 'OTP matched' });
      } else {
        // OTP did not match, return an invalid message
        res.status(401).json({ message: 'Invalid OTP' });
      }
    })
    .catch((error) => {
      console.error('Error verifying OTP', error);
      res.status(500).json({ message: 'Failed to verify OTP' });
    });
});