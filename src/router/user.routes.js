const router = require('express').Router()
const { errorMiddleware, authUser } = require('../middlewares')

const {
  registration,
  login,
  getProfile,
} = require('../controller/user.controller')
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../validation/user.validation')

router.route('/register').post(validateUserRegistration, registration)
router.route('/login').post(validateUserLogin, login)
router.route('/profile').get(authUser, getProfile)

router.use(errorMiddleware)

module.exports = router
