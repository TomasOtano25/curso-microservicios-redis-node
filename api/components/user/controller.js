const store = require('../../../store/dummy')

const TABLE = 'users'

function list() {
  return store.list(TABLE)
}

module.exports = {
  list
}
