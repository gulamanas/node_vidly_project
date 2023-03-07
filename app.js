const Joi = require('joi');
const genresRoute = require('./routes/genres');
const customerRoute = require('./routes/customers');
const movieRoute = require('./routes/movies');
const rentalRoute = require('./routes/rentals');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


app.use(genresRoute);
app.use(customerRoute);
app.use(movieRoute);
app.use(rentalRoute);
app.use(usersRoute);
app.use(authRoute);

const port = process.env.PORT || 9009
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})