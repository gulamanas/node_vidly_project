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

router.put('/api/customers/:id', async (req, res) => {
    const { error } = req.body;
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    }, {
        new: true
    });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.delete('/api/customers/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
})

router.get('/api/customers/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router;