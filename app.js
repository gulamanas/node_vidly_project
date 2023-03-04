const Joi = require('joi');
const genresRoute = require('./routes/genres');
const customerRoute = require('./routes/customers');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


app.use(genresRoute);
app.use(customerRoute);

const port = process.env.PORT || 9009
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})