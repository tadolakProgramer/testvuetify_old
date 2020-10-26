const imageController = require('../controllers/imagesController')

module.exports =(app) => {
    app.post('/update', imageController.upLoudImage)
}
