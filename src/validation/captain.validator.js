const Joi = require('joi')
const CustomError = require('../utils/CustomError.util')

// Captain validation schema
const captainRegiValidationSchema = Joi.object({
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
  socket_id: Joi.string().optional(),
  status: Joi.string()
    .valid('active', 'inactive')
    .default('inactive')
    .messages({
      'any.only': 'Status must be either active or inactive.',
    }),
  vehicle: Joi.object({
    color: Joi.string().min(3).required().messages({
      'string.min': 'Vehicle color must be at least 3 characters long.',
      'any.required': 'Vehicle color is required.',
    }),
    plate: Joi.string().min(3).required().messages({
      'string.min': 'Vehicle plate must be at least 3 characters long.',
      'any.required': 'Vehicle plate is required.',
    }),
    capacity: Joi.number().min(1).required().messages({
      'number.min': 'Vehicle capacity must be at least 1.',
      'any.required': 'Vehicle capacity is required.',
    }),
    vehicleType: Joi.string()
      .valid('car', 'motorcycle', 'auto')
      .required()
      .messages({
        'any.only': 'Vehicle type must be either car, motorcycle, or auto.',
        'any.required': 'Vehicle type is required.',
      }),
  }),
  location: Joi.object({
    lat: Joi.number().optional().messages({
      'number.base': 'Latitude must be a number.',
    }),
    lng: Joi.number().optional().messages({
      'number.base': 'Longitude must be a number.',
    }),
  }),
})

// Middleware function for captain validation
const validateCapRegistration = (req, res, next) => {
  const { error } = captainRegiValidationSchema.validate(req.body, {
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

const capLoginValidationSchema = Joi.object({
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
const validateCapLogin = (req, res, next) => {
  const { error } = capLoginValidationSchema.validate(req.body, {
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

module.exports = { validateCapRegistration, validateCapLogin }
