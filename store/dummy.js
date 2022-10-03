const db = {
  users: [
    { id: 1, name: 'Tomas' }
  ]
};

function list(table) {
  return db[table];
}

function get(table, id) {
  let collection = list(table)
  return collection.filter(item => item.id === id)[0] || null
}

function upsert(table, data) {
  db[table].push(data)
}

function remove(table, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
