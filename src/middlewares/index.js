const { errorMiddleware } = require('./error.middleware')
const { authUser } = require('./auth.middleware')

module.exports = { errorMiddleware, authUser }