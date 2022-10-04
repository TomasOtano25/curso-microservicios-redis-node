const auth = require('../../../auth')

const response = require('../../../network/response')

module.exports = function checkAuth(action) {

  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        // const owner = req.body.id
        auth.check.own(req, req.body.id)
        next();
        break;
      default:
        next()
    }
  }

  return middleware
}
