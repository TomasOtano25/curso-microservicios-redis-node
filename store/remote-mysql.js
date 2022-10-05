const remote = require('./remote')
const config = require('../config')

const HOST = config.mysqlService.host
const PORT = config.mysqlService.port

const store = new remote(HOST, PORT)

module.exports = store
