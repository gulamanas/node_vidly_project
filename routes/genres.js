const { Genre } = require('../models/genre')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/api/genres', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/api/genres', async (req, res) => {
    const { error } = req.body;
    if (error) return res.send(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name,
    })
    genre = await genre.save()

    res.send(genre);
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

router.delete('/api/genres/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/api/genres/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
})

// function validateGenre(genre) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     return Joi.validate(genre, schema);
// }

module.exports = router;