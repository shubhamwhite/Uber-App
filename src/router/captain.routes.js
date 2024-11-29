const router = require('express').Router()
const { errorMiddleware } = require('../middlewares')
const { registration } = require('../controller/captain.controller')
const {
  validateCaptainRegistration,
} = require('../validation/captain.validator')

router.route('/register').post(validateCaptainRegistration, registration)
router.use(errorMiddleware)

module.exports = router