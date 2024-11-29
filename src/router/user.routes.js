const router = require('express').Router()
const { errorMiddleware, authUser } = require('../middlewares')

const {
  registration,
  login,
  logout,
  getProfile,
} = require('../controller/user.controller')
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../validation/user.validation')

// routes
router.route('/register').post(validateUserRegistration, registration)
router.route('/login').post(validateUserLogin, login)
router.route('/profile').get(authUser, getProfile)
router.route('/logout').post(authUser, logout)
router.use(errorMiddleware)

module.exports = router // expoert files