const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { JwtUtil } = require('../utils/Jwt.util')

const captainSchema = new mongoose.Schema({
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
  socket_id: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 5 characters long'],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate must be at least 5 characters long'],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Email must be at least 5 characters long'],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto'],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
})

captainSchema.methods.generateAuthToken = function () {
  const token = JwtUtil.sign({ _id: this._id })
  return token
}

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10)
}

const captainModel = mongoose.model('captain', captainSchema)

module.exports = { captainModel }
