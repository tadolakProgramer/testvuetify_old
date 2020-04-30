const Sequelize = require('sequelize');

const sequelize = new Sequelize('test', 'NaprawyJS', 'NGCJrJM8DLNDhQAG', {
  dialect: 'mysql',
  host: '192.168.1.198',
  port: '13366',
  define: {
    freezeTableName: true, // Do not change my table names.
    timestamps: false // I will do this individually, thanks.
},
});

module.exports = sequelize;
