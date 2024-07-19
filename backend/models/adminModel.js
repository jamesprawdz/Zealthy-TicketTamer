const { DataTypes } = require("sequelize");
const dbConnection = require("../config/databaseConfig");

const Admin = dbConnection.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'admin_users',
    underscored: true,
  });
  
  module.exports = Admin;