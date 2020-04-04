const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const vMaszyny = sequelize.define('V_Maszyny', {
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
    ID: {type: Sequelize.INTEGER}
});

module.exports = vMaszyny;
