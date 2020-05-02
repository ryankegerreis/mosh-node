const express = require('express');
const router = express.Router();

const { Genre, validate } = require('../models/genre')

//Routes
//Get All
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres);
});

//Add a new Genre
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name })

  genre = await genre.save()

  res.send(genre);
});

//Edit a Genre
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

//Delete a Genre
router.delete('/:id', async (req, res) => {
  let genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

//Get a single Genre
router.get('/:id', async (req, res) => {
  let genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router