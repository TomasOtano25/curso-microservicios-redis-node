require('dotenv').config()

const config = {
  removeDB: process.env.REMOTE_DB || false,
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
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 14143,
    password: process.env.REDIS_PASS || 'root',
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001
  },
  cacheService: {
    host: process.env.CACHE_SRV_HOST || 'localhost',
    port: process.env.CACHE_SRV_PORT || 3003
  },
  post: {
    port: process.env.POST_PORT || 3002,
  }
}


module.exports = config
