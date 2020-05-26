const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const failurePart = sequelize.define('AWARIA_CZESCI', {
    AW_CZ_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    AWCZ_AW_ID: {type: Sequelize.INTEGER}, //ID_AWARIA
    AWCZ_CZID: {type: Sequelize.INTEGER}, //ID_CZ
    AWCZ_ILOSC: {type: Sequelize.INTEGER},

});

module.exports = failurePart;