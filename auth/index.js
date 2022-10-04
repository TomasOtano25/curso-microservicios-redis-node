const jwt = require('jsonwebtoken')

const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

function sign(data) {
  return jwt.sign(data, secret);
}

function getToken(auth) {
  // Bearer ................
  if (!auth) {
    throw error("Don't have a token", 401)
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 401)
  }

  const token = auth.replace('Bearer ', '')

  return token
}

function verify(token) {
  return jwt.verify(token, secret)
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req)
    console.log(decoded)

    // COMPROBAR SI ES O NO PROPIO
    if (decoded.id !== owner) {
      throw error("Can't do this", 401)
    }
  },
  logged: function (req) {
    decodeHeader(req)
  }
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}



module.exports = { sign, check }
