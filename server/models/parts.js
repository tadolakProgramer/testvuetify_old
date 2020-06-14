const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const Parts = sequelize.define('CZESCI', {
    ID_CZESC: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CZ_Nazwa: {type: Sequelize.STRING},
    CZ_Symbol: {type: Sequelize.STRING},
    CZ_NrKatalogowy: {type: Sequelize.STRING},
    CZ_Uwagi: {type: Sequelize.STRING},
    CZ_PROD_ID: {type: Sequelize.INTEGER},
    CZ_CZGR_ID: {type: Sequelize.INTEGER},
});

module.exports = Parts;