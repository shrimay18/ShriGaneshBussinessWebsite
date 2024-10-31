const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customer'); 
const authRoutes = require('./routes/auth'); 
const dbConnectionString = 'mongodb+srv://shrimay23bcs10117:scaler@shriganesh.nymoy.mongodb.net/?retryWrites=true&w=majority&appName=ShriGanesh';

const app = express();
const PORT = 2525;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
// MongoDB connection setup
mongoose.connect(dbConnectionString)
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
});

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
