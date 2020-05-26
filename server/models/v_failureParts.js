const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const vCzesciAwaria = sequelize.define('V_CZESCI_AWARIA', {
    AWCZ_AW_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ID_AWARIA: {type: Sequelize.INTEGER},
    ID_CZESC: {type: Sequelize.INTEGER},
    CZ_Nazwa: {type: Sequelize.STRING},
    CZ_Symbol: {type: Sequelize.STRING},
    CZ_NrKatalogowy: {type: Sequelize.STRING},
    AWCZ_ILOSC: {type: Sequelize.INTEGER}
});

module.exports = vCzesciAwaria;