const bcrypt = require('bcrypt')

const auth = require('../../../auth')
const TABLE = 'auth'

module.exports = function (injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  async function upsert(data) {
    const authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData)
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username })


    return bcrypt.compare(password, data.password)
      .then((equals) => {
        // Generate token
        if (equals) {
          const payload = { ...data }
          return auth.sign(payload)
        } else {
          throw new Error('Invalid Information')
        }
      })
  }

  return {
    upsert,
    login
  }

}
