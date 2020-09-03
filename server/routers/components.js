const partsController = require('../controllers/partsController');
const isAuth = require('../policies/isAuthenticated')

module.exports = (app) => {

    app.get('/components/gettree', componentController.getTree);

}
