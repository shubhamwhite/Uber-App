const router = require('express').Router()
const { errorMiddleware, authUser } = require('../middlewares')
const {
  registration,
  login,
  getProfile,
  logout,
} = require('../controller/captain.controller')
const {
  validateCapRegistration,
  validateCapLogin,
} = require('../validation/captain.validator')

router.route('/register').post(validateCapRegistration, registration)
router.route('/login').post(validateCapLogin, login)
router.route('/profile').get(authUser, getProfile)
router.route('/logout').post(authUser, logout)

router.use(errorMiddleware)

module.exports = router
