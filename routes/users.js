const { User, validate } = require('../models/user')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/api/users', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        res.send(user)
    }
    catch (err) {
        res.status(500).send(`${err.message}`)
    }

})

module.exports = router;

