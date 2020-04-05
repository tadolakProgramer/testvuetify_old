const Sequelize = require('sequelize');

const sequelize = require('../database/databases');

const Awarie = sequelize.define('AWARIE', {
    ID_AWARIA: {
    type: Sequelize.BIGINT(20),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  AW_DataZgloszenia: {
    type: Sequelize.DATE(6)
  },
  Maszyna_ID: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  AW_Zglaszajacy_ID: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  AW_OpisAwarii: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  AW_Dzialania: {
    type: Sequelize.STRING(250),
    allowNull: true
  },
  AW_Zrealizowane: {
    type: Sequelize.STRING(25),
    allowNull: true
  }
});

module.exports = Awarie;