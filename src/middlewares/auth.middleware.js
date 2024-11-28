const { userModel: _userModel } = require('../models/user.model')
const { JwtUtil } = require('../utils/Jwt.util')
const CustomError = require('../utils/CustomError.util')

exports.authUser = async (req, res, next) => {
  try { 

    const token = req.cookies.token || req.headers.authorization.split(' ')[1]

    if (!token) {
      throw new CustomError(401, 'Unauthorized user')
    }

    const { _id, } = await JwtUtil.verify(token)

    req.user = {}
    req.user._id = _id
    return next()

  } catch (error) {

    next (error)
  }

}
