const debug = require('debug')('app:startup')

const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./middleware/logger')
const auth = require('./middleware/authenticator')
const home = require('./routes/home')
const courses = require('./routes/courses')

const express = require('express')
const app = express()

//View Engine
app.set('view engine', 'pug')
app.set('views', './views')

//Middleware
app.use(express.json())
app.use(logger)
app.use(auth)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

//Routes
app.use('/api/courses', courses)
app.use('/', home)

console.log("name", config.get('name'))
console.log('mail', config.get('mail.host'))
console.log('password', config.get('mail.password'))

if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  debug('Morgan enabled...')
}

//Port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port} `))