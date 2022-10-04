const auth = require('../../../auth')

const response = require('../../../network/response')

module.exports = function checkAuth(action) {

  function middleware(req, res, next) {
    switch (action) {
      case 'update':
        // const owner = req.body.id
        try {
          auth.check.own(req, req.body.id)
          next();
        } catch (error) {
          response.error(req, res, error.message, 400)
        }
        break;
      default:
        next()
    }
  }

  return middleware
}
