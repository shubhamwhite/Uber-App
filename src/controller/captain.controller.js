const {
  captainModel: _captainModel,
  blacklistTokenModel: _blacklistTokenModel,
} = require('../models')
const CustomError = require('../utils/CustomError.util')
const {
  createSuccessResponse: _Success,
} = require('../constant/response.constant')

// * Register controller function
exports.registration = async (req, res, next) => {
  try {
    const { full_name, email, password, vehicle } = req.body

    if (!full_name || !full_name.first_name) {
      throw new CustomError(400, 'Full name or first name is missing')
    }

    if (!email || !password) {
      throw new CustomError(400, 'Email and password are required')
    }

    const existingEmail = await _captainModel.findOne({ email })
    if (existingEmail) {
      throw new CustomError(409, 'Email already exists')
    }

    const hashedPassword = await _captainModel.hashPassword(password)

    const user = await _captainModel.create({
      full_name: {
        first_name: full_name.first_name,
        last_name: full_name.last_name,
      },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    })

    const token = user.generateAuthToken()

    res
      .status(200)
      .json(_Success('Captain registration successfully', { user, token }))
  } catch (error) {
    next(error)
  }
}

// * Login controller function
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const captain = await _captainModel.findOne({ email }).select('+password')

    if (!captain) {
      throw new CustomError(400, 'Invalid captain or password')
    }

    const isMatch = await captain.comparePassword(password)

    if (!isMatch) {
      throw new CustomError(400, 'Invalid captain or password')
    }

    const token = captain.generateAuthToken()
    res.cookie('token', token)

    res
      .status(200)
      .json(_Success('Captain login successfully', { captain, token }))
  } catch (error) {
    next(error)
  }
}

// * Profile controller function
exports.getProfile = async (req, res, next) => {
  try {
    const getProfile = await _captainModel
      .findOne({ _id: req.user._id })
      .select('-password -updatedAt -__v')
    res
      .status(200)
      .json(_Success('Captain profile retrieve successful', getProfile))
  } catch (error) {
    next(error)
  }
}

// * Captain logout function
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
