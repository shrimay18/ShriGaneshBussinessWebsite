// src_server/models/Customer.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true }
});

module.exports = mongoose.model('Customer', CustomerSchema);
