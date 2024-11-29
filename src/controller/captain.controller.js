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

    // Validate input 
    if (!full_name || !full_name.first_name) { 
      throw new CustomError(400, 'Full name or first name is missing')
    }

    if (!email || !password) {
      throw new CustomError(400, 'Email and password are required')
    }

    // Check if user already exists
    const existingEmail = await _captainModel.findOne({ email })
    if (existingEmail) {
      throw new CustomError(409, 'Email already exists')
    }

    // Hash password
    const hashedPassword = await _captainModel.hashPassword(password)

    // Create user
    const user = await _captainModel.create({
      full_name: {
        first_name: full_name.first_name,
        last_name: full_name.last_name,
      },
      email,
      password: hashedPassword,
      vehicle:{
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      }
    })

    // Generate authentication token
    const token = user.generateAuthToken()

    res
      .status(200)
      .json(_Success('Captain registration successfully', { user, token }))
  } catch (error) {
    next(error)
  }
}
