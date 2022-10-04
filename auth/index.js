const jwt = require('jsonwebtoken')

function sign(data) {
  return jwt.sign(data, 'secreto');
}

function verify() { }

module.exports = { sign, verify }
