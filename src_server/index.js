const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 2525;

const dbConnectionString = "mongodb+srv://shrimay23bcs10117:scaler@shriganesh.nymoy.mongodb.net/?retryWrites=true&w=majority&appName=ShriGanesh"; // Access the connection string

app.use(cors());
app.use(bodyParser.json());

console.log('MongoDB Connection String:', dbConnectionString);
mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // Make sure to hash passwords before storing them
    contact: Number,
});

const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, email, password, contact } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashedPassword, contact });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if password matches (assuming the passwords are hashed in the database)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // If password doesn't match
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // If login is successful
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: 'your-jwt-token', // You can generate and send a JWT token here
        });
    } catch (err) {
        // Handle any errors
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

