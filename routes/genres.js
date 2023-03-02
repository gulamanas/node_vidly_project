const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// const genres = [
//     { id: 1, name: 'Action' },
//     { id: 2, name: 'Horor' },
//     { id: 3, name: 'Romance' },
// ]

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
}))

router.get('/api/genres', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/api/genres', async (req, res) => {
    const { error } = req.body;
    if (error) return res.send(400).send(error.details[0].message);

    let genre = new Genre({name: req.body.name})
    genre = await genre.save()
    
    res.send(genre);
})

router.put('/api/genres/:id', async (req, res) => {
    const {error } = req.body.name
    if (error) return res.status(400).send(error.details[0].message)
    
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found')

    // const { error } = req.body;
    if (error) return res.status(400).send({ error: error.message });

    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    const index = genres.indexOf(genre);
    genres.splice(index, 1)

    res.send(genre);
})

router.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

// function validateGenre(genre) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     return Joi.validate(genre, schema);
// }

module.exports = router;