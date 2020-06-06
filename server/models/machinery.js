const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const Machinery = sequelize.define('Maszyna', {
    ID_Maszyna: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
    TypMaszyny_ID: {
      type:Sequelize.INTEGER,
       allowNull: false,
    },
    NazwaMaszyny: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Hala_ID: {
        type:Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = Machinery;