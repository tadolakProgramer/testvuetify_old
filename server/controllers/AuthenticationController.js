const Users = require('../models/users');
const Hale = require('../models/hale');

module.exports = {

    async getHale(req, res) {
        await Hale.findAll()
            .then(hale => res.send(hale))
            .catch(error => console.log(error));
    }
};

