const router = require('express').Router()
const errorMiddleware = require('../middlewares/error.middleware')
const { registration, login } = require('../controller/user.controller')
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../validation/user.validation')

router.route('/register').post(validateUserRegistration, registration)
router.route('/login').post(validateUserLogin, login)

 router.use(errorMiddleware)

module.exports = router
