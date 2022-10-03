const nanoid = require('nanoid')

const TABLE = 'users'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  function list() {
    return store.list(TABLE)
  }

  function get(id) {
    return store.get(TABLE, id)
  }

  function upsert(data) {
    const user = { ...data, id: data.id ? data.id : nanoid() }
    return store.upsert(TABLE, user)
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}
