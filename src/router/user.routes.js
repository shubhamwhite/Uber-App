const router = require('express').Router()
const validateUser = require('../middlewares/user.validation')
const errorMiddleware = require('../middlewares/error.middleware')
const { registration } = require('../controller/user.controller')

router.route('/register').post(validateUser, registration)
router.route('login').post()

router.use(errorMiddleware)

module.exports = router
