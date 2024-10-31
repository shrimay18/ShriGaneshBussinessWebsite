// src_server/routes/customer.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET request to fetch all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customers' });
    }
});

// POST request to add a new customer
router.post('/', async (req, res) => {
    const { serialNumber, name, email, mobile } = req.body;

    try {
        const newCustomer = new Customer({ serialNumber, name, email, mobile });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ error: 'Error adding customer' });
    }
});

module.exports = router;
