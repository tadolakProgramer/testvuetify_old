const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const vMaszyny = sequelize.define('v_maszynyWithSumFailure', {
    NazwaHali: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ID_Maszyna: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Hala_id: {type: Sequelize.INTEGER},
    NazwaMaszyny: {type: Sequelize.STRING},
    NazwaTypu: {type: Sequelize.STRING},
    ID: {type: Sequelize.INTEGER},
    SumAwarii: {type: Sequelize.INTEGER}
});

module.exports = vMaszyny;
