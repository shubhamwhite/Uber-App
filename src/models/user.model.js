const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { JwtUtil } = require('../utils/Jwt.util')

const userSchema = new mongoose.Schema({
  full_name: {
    first_name: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    last_name: {
      type: String,
      minlength: [3, 'Last name must be at least 3 characters long'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
  },
  password: {
    type: String,
    required: true,
    select: false, // Hide the password when querying for the user
  },
  role: {
    type: String,
    enum: ['driver', 'passenger'],
    required: true,
    default: 'passenger', // Default to passenger if no role is specified
  },
  socket_id: {
    type: String,
  },
})

// Instance method to generate auth token
userSchema.methods.generateAuthToken = function () {
  const token = JwtUtil.sign({ _id: this._id })
  return token
}

// Instance method to compare password (for login)
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Static method to hash password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel }
