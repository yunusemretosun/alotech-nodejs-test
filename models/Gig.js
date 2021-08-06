const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');

const Gig = db.define('gig', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  description: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  imgurl: {
      type: DataTypes.STRING,
      allowNull: false,
  }
});

Gig.sync().then(() => {
  console.log('table created');
});
module.exports = Gig;