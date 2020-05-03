const express = require('express')
const router = express.Router()

const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name')
  res.send(movies)
})

//Add Movie
router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(404).send(error.details[0])

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid genre')

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  })

  await movie.save()

  res.send(movie)
})

//Edit Movie
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findById(req.body.genreId)
  if (!genre) return res.status(400).send('Invalid genre')

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name
    }
  })

  if (!movie) return res.status(400).send('Movie with that Id was not found')

  res.send(movie)
})

//Delete a movie
router.delete('/:id', async (req, res) => {
  let movie = await Movie.findByIdAndRemove(req.params.id)

  if (!movie) return res.status(400).send("The movie with that Id aint here.")

  res.send(movie)
})

// Get one movie
router.get('/:id', async (req, res) => {
  let movie = await Movie.findById(req.params.id)

  if (!movie) return res.status(400).send('Nope, no movie with that id here')

  res.send(movie)
})

module.exports = router