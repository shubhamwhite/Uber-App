const { userModel: _userModel } = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CustomError = require('../utils/CustomError.util')
const config = require('../config/general.config')

exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(' ')[1]
  if (!token) {
    throw new CustomError(401, 'Unauthorized user')
  }

  try { 
    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await _userModel.findById(decoded._id)
    req.user = user
    return next()

  } catch (error) {
    next(error)
  }
}
