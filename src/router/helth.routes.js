const router = require('express').Router()
const { errorMiddleware } = require('../middlewares')
const { healthCheck } = require('../controller/helth.controller')

router.route('/check').get(healthCheck)
router.use(errorMiddleware)

module.exports = router  