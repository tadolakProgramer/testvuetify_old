const partsController = require('../controllers/partsController');
const isAuth = require('../policies/isAuthenticated')

module.exports = (app) => {

    app.get('/getAllParts', partsController.getAllParts);

    app.post('/part/addPart', partsController.addPart);

    app.get('/part/getAllProducer', partsController.getAllProducer);

    app.post('/part/addProducer', partsController.postAddProducer);

    app.get('/part/getAllTypePart', partsController.getAllTypePart);

    app.post('/part/addTypePart', partsController.postAddTypePart);
}