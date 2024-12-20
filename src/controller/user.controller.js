const {
  userModel: _userModel,
  blacklistTokenModel: _blacklistTokenModel,
} = require('../models')
const CustomError = require('../utils/CustomError.util')
const {
  createSuccessResponse: _Success,
} = require('../constant/response.constant')

// * Register controller function
exports.registration = async (req, res, next) => {
  try {
    console.log('Request Body:', req.body)

    const { full_name, email, password } = req.body
    console.log('Full Name:', full_name)

    // Validate input
    if (!full_name || !full_name.first_name) {
      throw new CustomError(400, 'Full name or first name is missing')
    }
    if (!email || !password) {
      throw new CustomError(400, 'Email and password are required')
    }

    // Check if user already exists
    const existingUser = await _userModel.findOne({ email })
    if (existingUser) {
      throw new CustomError(409, 'User already exists')
    }

    // Hash password
    const hashedPassword = await _userModel.hashPassword(password)

    // Create user
    const user = await _userModel.create({
      full_name: {
        first_name: full_name.first_name,
        last_name: full_name.last_name,
      },
      email,
      password: hashedPassword,
    })

    // Generate authentication token
    const token = user.generateAuthToken()

    res
      .status(201)
      .json(_Success('User registration successfully', { user, token }))
  } catch (error) {
    next(error)
  }
}

// * Login controller function
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await _userModel.findOne({ email }).select('+password')

    if (!user) {
      throw new CustomError(400, 'Invalid user or password')
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      throw new CustomError(400, 'Invalid user or password')
    }

    const token = user.generateAuthToken()
    res.cookie('token', token)

    res.status(200).json(_Success('User login successfully', { user, token }))
  } catch (error) {
    next(error)
  }
}

// * User profile function

exports.getProfile = async (req, res, next) => {
  try {
    const getProfile = await _userModel
      .findOne({ _id: req.user._id })
      .select('-password -updatedAt -__v')
    res
      .status(200)
      .json(_Success('User profile retrieve successful', getProfile))
  } catch (error) {
    next(error)
  }
}

// * User logout function

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await _blacklistTokenModel.create({ token })
    res.status(200).json(_Success('Logged out'))
  } catch (error) {
    next(error)
  }
}
