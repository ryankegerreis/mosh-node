const Joi = require('joi');
const express = require('express');
const app = express();

const genres = require('./routes/genres')

//Middleware
app.use(express.json());

//Routes
app.use('/api/genres', genres)

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));