const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

router.get('/api/customers', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

router.post('/api/customers', async (req, res) => {
    const { error } = req.body;
    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    })

    customer = await customer.save();

    res.send(customer);
})

module.exports = router;