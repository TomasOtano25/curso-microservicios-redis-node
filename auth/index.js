const jwt = require('jsonwebtoken')

const config = require('../config')

const secret = config.jwt.secret

function sign(data) {
  return jwt.sign(data, secret);
}

function getToken(auth) {
  // Bearer ................
  if (!auth) {
    throw new Error("Don't have a token")
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid format')
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
      throw new Error("Can't do this")
    }
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
