const Sequelize = require('sequelize');

/*
  prepare for yourself(username kismina pg4admin username ve pass).
  const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
*/
module.exports =  new Sequelize('codegig','postgres','123', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});
