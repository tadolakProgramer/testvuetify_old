const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const PodzespolMaszyny = sequelize.define('podzespolymaszyny', {
    ID_Podzespol: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    pdz_Nazwa: {type: Sequelize.STRING(50)},
    pdz_informacje: {type: Sequelize.STRING(50)},
    pdz_rodzic: {type: Sequelize.INTEGER},
});

module.exports = PodzespolMaszyny;
