const { Genre } = require('../models/genre')
const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


router.get('/api/genres', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/api/genres', auth, async (req, res) => {
    try {
        let genre = new Genre({
            name: req.body.name,
        })
        genre = await genre.save()

        res.send(genre);

    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.put('/api/genres/:id', async (req, res) => {
    const { error } = req.body.name
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!genre) return res.status(404).send('The genre with the given ID was not found')

    if (error) return res.status(400).send({ error: error.message });

    res.send(genre);
})

router.delete('/api/genres/:id', [auth, admin], async (req, res) => {
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id);

        if (!genre) return res.status(404).send('The genre with the given ID was not found.');

        res.send(genre);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/api/genres/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
})


module.exports = router;