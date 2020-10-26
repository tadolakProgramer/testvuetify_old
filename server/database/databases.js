const Sequelize = require('sequelize');

const sequelize = new Sequelize('ur_folplast', 'NaprawyJS', 'NGCJrJM8DLNDhQAG', {
  dialect: 'mysql',
  //host: '91.233.233.105',
  host: '192.168.0.41',
  port: '13366',
  define: {
    freezeTableName: true, // Do not change my table names.
    timestamps: false // I will do this individually, thanks.
},
});

module.exports = sequelize;

