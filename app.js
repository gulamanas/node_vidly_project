const Joi = require('joi');
const genresRoute = require('./routes/genres')
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))


app.use(genresRoute);

const port = process.env.PORT || 9009
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})