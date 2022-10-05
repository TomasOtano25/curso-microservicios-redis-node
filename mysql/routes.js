const express = require('express');

const response = require('../network/response')
const store = require('../store/mysql')

const router = express.Router();

router.get('/:table', list)
router.get('/query/:table', query)
router.get('/:table/:id', get)
// router.post('/:table', insert)
router.post('/:table', upsert)

async function list(req, res) {
  const data = await store.list(req.params.table)
  response.success(req, res, data, 200)
}
async function get(req, res) {
  const data = await store.get(req.params.table, req.params.id)
  response.success(req, res, data, 200)
}
// async function insert(req, res) {
//   const data = await store.insert(req.params.table, req.body)
//   response.success(req, res, data, 200)
// }
async function upsert(req, res) {
  const data = await store.upsert(req.params.table, req.body)
  response.success(req, res, data, 200)
}
async function query(req, res) {
  console.log(req.body)
  const data = await store.query(req.params.table, req.body.query, req.body.join)
  response.success(req, res, data, 200)
}

module.exports = router
