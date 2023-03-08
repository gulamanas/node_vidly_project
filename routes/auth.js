const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/api/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
        // const token = user.genarateAuthToken();
        res.send(token)
    } catch (error) {
        res.status(500).send(`${err.message}`)
    }
});

module.exports = router;