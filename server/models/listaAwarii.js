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
    TypMaszynyID: {
        type: Sequelize.INTEGER},
    ID_OM: {
        type: Sequelize.INTEGER},
    ID_USER: {
        type: Sequelize.INTEGER},
    NazwaMaszyny: {
        type: Sequelize.STRING },
    NazwaTypu: {
        type: Sequelize.STRING },
    NazwaHali: {
        type: Sequelize.STRING },
    AW_OpisAwarii: {
        type: Sequelize.STRING },
    AW_Typ: {
        type: Sequelize.STRING },
    ObszarMaszyny: {
        type: Sequelize.STRING },
    AW_MO_SYMBOL: {
        type: Sequelize.STRING
    },
    AW_Dzialania: {
        type: Sequelize.STRING
    },
    US_Name: {
        type: Sequelize.STRING },
    US_SUER_NAME: {
        type: Sequelize.STRING
    },
    AW_Zrealizowane: {
        type: Sequelize.STRING
    },
    AW_DataZakonczenia: {
        type: Sequelize.DATE,
        allowNull: true
    },
    AW_Zatwierdzone: {
        type: Sequelize.STRING(1),
        allowNull: true
    },
    AW_Data_Zatwierdzenia: {
        type: Sequelize.DATE,
        allowNull: true
    },
    AW_ID_Zatwierdzajacy: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Listaawarii;
