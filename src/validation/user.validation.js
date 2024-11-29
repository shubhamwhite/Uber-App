const Joi = require('joi')
const CustomError = require('../utils/CustomError.util') // Assuming you have the CustomError class in util/errorHandler

const userRegiValidationSchema = Joi.object({
  full_name: Joi.object({
    first_name: Joi.string().min(3).required().messages({
      'string.min': 'First name must be at least 3 characters long.',
      'any.required': 'First name is required.',
    }),
    last_name: Joi.string().min(3).allow(null, '').messages({
      'string.min': 'Last name must be at least 3 characters long.',
    }),
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
  role: Joi.string()
    .valid('driver', 'passenger')
    .default('passenger')
    .messages({
      'any.only': 'Role must be either driver or passenger.',
    }),
  socket_id: Joi.string().optional(),
})

// Middleware function
const validateUserRegistration = (req, res, next) => {
  const { error } = userRegiValidationSchema.validate(req.body, {
    abortEarly: false,
  })

  if (error) {
    const validationMessages = error.details
      .map((detail) => detail.message)
      .join(', ')
    console.log(validationMessages, 'error message')
    throw CustomError.BadRequest('Validation failed', validationMessages)
  }

  next()
}

const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.',
  }),
})

// Middleware function
const validateUserLogin = (req, res, next) => {
  const { error } = userLoginValidationSchema.validate(req.body, {
    abortEarly: false,
  })

  if (error) {
    const validationMessages = error.details
      .map((detail) => detail.message)
      .join(', ')
    console.log(validationMessages, 'error message')
    throw CustomError.BadRequest('Validation failed', validationMessages)
  }

  next()
}

module.exports = { validateUserRegistration, validateUserLogin }
