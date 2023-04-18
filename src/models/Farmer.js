const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Farmer = sequelize.define('Farmer', {
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'phone_number',
  },
  farmerName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'farmer_name',
  },
  stateName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'state_name',
  },
  districtName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'district_name',
  },
  villageName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'village_name',
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'farmers',
});

module.exports = Farmer;