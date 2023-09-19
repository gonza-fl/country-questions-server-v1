const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserStats = sequelize.define('user_stats', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fails: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = UserStats;
