const express = require('express')
const router = express.Router()

const { Customer, validate } = require('../models/customer')

//Routes
//Get All Customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

//Add a new customer
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  })

  customer = customer.save()

  res.send(customer)
})

//Edit a customer
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, { new: true })

  if (!customer) return res.status(404).send('Customer not found')

  res.send(customer)
})

// Delete a customer
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)

  if (!customer) return res.status(404).send("Customer not found")

  res.send(customer)
})

//Get one customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (!customer) return res.status(404).send("Can't get that on, no customer found with that id.")

  res.send(customer)
})

module.exports = router