const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const vParts = sequelize.define('V_CZESCI', {
    ID_CZESC: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    CZ_Nazwa: {type: Sequelize.STRING},
    CZ_Symbol: {type: Sequelize.STRING},
    CZ_NrKatalogowy: {type: Sequelize.STRING},
    CZ_Uwagi: {type: Sequelize.STRING},
    CZGR_NAZWA: {type: Sequelize.STRING},
    CZPR_NAZWA: {type: Sequelize.STRING},
});

module.exports = vParts;