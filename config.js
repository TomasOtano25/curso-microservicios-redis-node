require('dotenv').config()

const config = {
  api: {
    port: process.env.PORT || 3000,

  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secreto'
  }
}


module.exports = config
