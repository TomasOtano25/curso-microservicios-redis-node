const nanoid = require('nanoid')

const auth = require('../auth')

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

  async function upsert(data) {
    const body = {
      name: data.name,
      username: data.username,
    }

    const user = { ...body, id: data.id ? data.id : nanoid() }

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }

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
