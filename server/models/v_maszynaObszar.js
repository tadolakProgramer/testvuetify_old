const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const vTypMaszynyObszar = sequelize.define('V_TypMaszynyObszar', {
    ID_Typ: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ID_OM: {type: Sequelize.INTEGER},
    NazwaTypu: {
        type: Sequelize.STRING,
        allowNull: false
    },
    OM_Nazwa: {type: Sequelize.STRING},
    OM_Komentarz: {type: Sequelize.STRING},
});

module.exports = vTypMaszynyObszar;
