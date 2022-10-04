require('dotenv').config()

const config = {
  api: {
    port: process.env.PORT || 3000,

  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secreto'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || 'root',
    database: process.env.MYSQL_DB || 'api_v1',
  }
}


module.exports = config
