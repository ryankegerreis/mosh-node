const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly').then(() => console.log("Connected to MongoDB Vidly!")).catch((err) => console.error("Could not connect to MongoDB :("))

const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')

//Middleware
app.use(express.json());

//Routes
app.use('/api/genres', genres)
app.use('api/customers', customers)
app.use('api/movies', movies)
app.use('api/rentals', rentals)


//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));