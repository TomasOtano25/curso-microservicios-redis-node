const nanoid = require('nanoid')

const TABLE = 'post'

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
    const newPost = {
      id: data.id || nanoid(),
      user: data.user,
      text: data.text
    }

    return store.upsert(TABLE, newPost);
  }

  function getByUser(userId) {
    return store.query(TABLE, {
      user: userId
    })
  }


  return {
    list,
    get,
    upsert,
    getByUser
  }
}
