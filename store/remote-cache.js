const remote = require('./remote')
const config = require('../config')

const HOST = config.cacheService.host
const PORT = config.cacheService.port

const store = new remote(HOST, PORT)

module.exports = store
