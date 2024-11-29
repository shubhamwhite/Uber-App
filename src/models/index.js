const mongoose = require('mongoose')
const config = require('../config/app.config')
const clc = require('../helper/cliColor.helper')
const { userModel } = require('../models/user.model')
const { blacklistTokenModel } = require('../models/blackListToken.model')

const connectToDb = async () => {
  try {
    await mongoose.connect(config.DB_CONNECT)
    console.log(clc.success('Connected to the database successfully!'))
  } catch (err) {
    console.error(clc.error('Database connection error:', err))
  }

  // Optional: Handle mongoose connection events
  mongoose.connection.on('disconnected', () => {
    console.log(clc.error('Mongoose connection disconnected.'))
  })
}

module.exports = { connectToDb, userModel, blacklistTokenModel }
