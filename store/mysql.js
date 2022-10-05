const mysql = require('mysql')

const config = require('../config')

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((error) => {
    if (error) {
      console.log('[db err]', error)
      setTimeout(handleCon, 2000)
    } else {
      console.log('>>> DB connected successfully')
    }
  })

  connection.on('error', (error) => {
    console.log('[db err]', error)
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon()
    } else {
      throw new Error(error);
    }
  })
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error)

      resolve(data)
    })
  })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (error, data) => {
      if (error) return reject(error)

      resolve(data[0] || null)
    })
  })
}

async function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

async function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })
  })
}

async function upsert(table, data) {
  if (data && data.id) {
    const exists = await get(table, data.id);
    if (exists !== null) {
      return update(table, data)
    }
  }
  return insert(table, data);
}

// async function query(table, query) {
//   return new Promise((resolve, reject) => {
//     connection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, result) => {
//       if (error) return reject(error)
//       resolve(result || null)
//     })
//   })
// }

async function query(table, query, join) {
  let joinQuery = ''
  if (join) {
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (error, result) => {
      if (error) return reject(error)
      resolve(result || null)
    })
  })
}

module.exports = {
  list,
  get,
  upsert,
  query
}
