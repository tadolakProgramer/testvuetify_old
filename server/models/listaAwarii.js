const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const Listaawarii = sequelize.define('LISTAAWARII', {
    ID_AWARIA: {
        type: Sequelize.INTEGER,
        primaryKey: true},
    AW_DataZgloszenia: {
        type: Sequelize.DATE},
    DataAW: {
        type: Sequelize.STRING},
    ID_Maszyna: {
        type: Sequelize.INTEGER},
    NazwaMaszyny: {
        type: Sequelize.STRING },
    NazwaTypu: {
        type: Sequelize.STRING },
    NazwaHali: {
        type: Sequelize.STRING },
    AW_OpisAwarii: {
        type: Sequelize.STRING },
    AW_Dzialania: {
        type: Sequelize.STRING
    },
    AW_Zrealizowane: {
        type: Sequelize.STRING
    }
});

module.exports = Listaawarii;
