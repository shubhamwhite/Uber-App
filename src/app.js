const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/user', require('../src/router/user.routes'))
app.use('/api/v1/captain', require('../src/router/captain.routes'))
app.use('/api/v1/health', require('./router/health.routes'))
 
// testing api create
app.get('/', (req, res) => {
  res.json({ message: 'Home route' })
})  

module.exports = app
