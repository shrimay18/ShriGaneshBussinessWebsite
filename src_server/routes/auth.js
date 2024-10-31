const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();
const secretKey = 'scaler'; // Use a secure key in production

// Temporary storage for OTPs (this can be improved with Redis for larger projects)
let otpStore = {};

// Configure Nodemailer to send email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shrimaynotion18@gmail.com', 
        pass: 'ikiz qukn dcjs vhqo'
    }
});

// Signup Route
// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password, contact, role } = req.body;

    // Check OTP if role is admin
    if (role === 'admin') {
        const storedOtp = otpStore[email];
        if (!storedOtp || storedOtp.otp !== req.body.otp || Date.now() > storedOtp.expiresAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        delete otpStore[email]; // Clear OTP after successful verification
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, contact, role });
        await newUser.save();

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, secretKey, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
});

router.post('/send-otp-admin', async (req, res) => {
    const { name } = req.body;
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore['admin'] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    try {
        // Send OTP to the fixed email address
        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: 'shrimaysomani18@gmail.com',
            subject: 'Your OTP for Admin Signup',
            text: `Hello ${name}, your OTP is ${otp}. It expires in 5 minutes.`
        });

        res.status(200).json({ message: 'OTP sent successfully to admin email.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP. Please try again later.' });
    }
});

// Verify OTP for Admin Signup
router.post('/verify-otp-admin', async (req, res) => {
    const { otp } = req.body;

    const storedOtp = otpStore['admin'];
    if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    delete otpStore['admin'];
    const token = jwt.sign({ role: 'admin' }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'OTP verified successfully', token });
});

// router.post('/send-otp', async (req, res) => {
//     const { email } = req.body;
//     if (email !== 'shrimaysomani18@gmail.com') {
//         return res.status(400).json({ message: 'Unauthorized email address' });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

//     try {
//         await transporter.sendMail({
//             from: 'shrimaynotion18@gmail.com',
//             to: email,
//             subject: 'Your OTP for Admin Signup',
//             text: `Your OTP for admin signup is ${otp}. It expires in 5 minutes.`
//         });
//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error sending OTP. Please try again later.' });
//     }
// });

// // Verify OTP for Admin Signup
// router.post('/verify-otp', (req, res) => {
//     const { email, otp } = req.body;

//     const storedOtp = otpStore[email];
//     if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
//         return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     delete otpStore[email];
//     const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
//     res.status(200).json({ message: 'OTP verified successfully', token });
// });

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error(`User not found with email: ${email}`);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Invalid credentials');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ email: user.email, id: user._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token, // Return JWT token to frontend
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
