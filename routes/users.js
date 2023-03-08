const auth = require('../middleware/auth')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/api/users/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);

    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/api/users', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        await user.save();

        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(user)
    }
    catch (err) {
        res.status(500).send(`${err.message}`)
    }

})

module.exports = router;

