const nanoid = require('nanoid')

const auth = require('../auth')

const TABLE = 'user'

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

  function follow(from, to) {
    return store.upsert(`${TABLE}_follow`, {
      user_from: from,
      user_to: to
    })
  }

  function followers(user) {
    const join = {}
    join[TABLE] = 'user_from'; // { user: 'user_from'}
    const query = { user_to: user }

    return store.query(`${TABLE}_follow`, query, join)
  }

  function following(user) {
    const join = {}
    join[TABLE] = 'user_to'; // { user: 'user_to'}
    const query = { user_from: user }
    return store.query(`${TABLE}_follow`, query, join)
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    list,
    get,
    upsert,
    follow,
    followers,
    following,
    remove
  }
}
