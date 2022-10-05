const fetch = require('node-fetch')

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`

  function list(table) {
    return req('GET', table);
  }
  function get(table, id) {
    return req('GET', table, undefined, id);
  }

  // function insert(table, data) {
  //   return req('POST', table, data)
  // }

  function upsert(table, data) {
    return req('POST', table, data)
  }

  function query(table, query, join) {
    const body = { query, join }
    return req('GET', table, body, undefined, true)
  }

  async function req(method, table, data, id, query = false) {
    let url = `${URL}/${table}${query ? '/query' : ''}${id ? '/' + id : ''}`;
    let body = JSON.stringify(data) || null;

    const params = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    }
    if (body) {
      params.body = body;
    }

    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then(response => response.json())
        .then(json => resolve(json.body))
        .catch(error => {
          console.log('[Error en la base de datos remota]: ', error)
          return reject(error.message)
        })
    })
  }

  return {
    list,
    get,
    upsert,
    query,
  }
}

module.exports = createRemoteDB
