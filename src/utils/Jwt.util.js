const config = require('../config/app.config')
const jwt = require('jsonwebtoken')

class JwtUtil {
  static sign(payload, expiry = '1m', secret = config.JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry })
  }
  static verify(token, secret = config.JWT_SECRET) {
    return jwt.verify(token, secret)
  }
}

module.exports = { JwtUtil }
