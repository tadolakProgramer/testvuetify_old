const componentController = require('../controllers/componentController');
const isAuth = require('../policies/isAuthenticated')

module.exports = (app) => {

    app.get('/components/gettree', componentController.getTree);

    app.post('/components/addNewNode', componentController.postAddNewNode)

    app.post('/components/updateNode', componentController.postUpdateNode)

}
