const { userModel } = require('../models/user.model')
const CustomError = require('../utils/CustomError.util')

// * register controller function
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
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await userModel.hashPassword(password)

    // Create user
    const user = await userModel.create({
      full_name: {
        first_name: full_name.first_name,
        last_name: full_name.last_name,
      },
      email,
      password: hashedPassword,
    })

    // Generate authentication token
    const token = user.generateAuthToken()

    res.status(201).json({ user, token })
  } catch (error) {
    console.log(error, 'Error during registration')
    next(error)
  }
}
