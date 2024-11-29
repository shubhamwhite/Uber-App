const { JwtUtil } = require('../utils/Jwt.util')
const CustomError = require('../utils/CustomError.util')
const { userModel: _userModel } = require('../models')
const { createSuccessResponse: _Success } = require('../constant/response.constant')

exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  if (!token) {
    return next(new CustomError(401, 'Unauthorized user'))
  }

  const isBlackListed = await _userModel.findOne({ token: token })
  
  if (isBlackListed) {
    return res.status(200).json(_Success('Unauthorized'))
  }

  try {
    const { _id } = await JwtUtil.verify(token)
    req.user = { _id }
    return next()
  } catch (error) {
    next(error)
  }
}
