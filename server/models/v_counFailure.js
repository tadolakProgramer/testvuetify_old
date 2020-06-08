const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const v_countFailure = sequelize.define('V_LicznikZgloszen', {
    ID_Maszyna: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    NazwaMaszyny: {type: Sequelize.STRING},
    NazwaTypu: {type: Sequelize.STRING},
    SumaAwariiA: {type: Sequelize.INTEGER},
    SumaAwariiM: {type: Sequelize.INTEGER},
});

module.exports = v_countFailure;