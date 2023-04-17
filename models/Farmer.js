const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Farmer = sequelize.define('Farmer', {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  farmerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  districtName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  villageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Farmer;