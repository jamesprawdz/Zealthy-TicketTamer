const { DataTypes } = require("sequelize");
const dbConnection = require("../config/databaseConfig");

const Ticket = dbConnection.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("open", "closed", "in_progress", "postponed"),
      defaultValue: "open",
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
      allowNull: false,
    },
    response: {
      type: DataTypes.ENUM(
        "Ticket successfully resolved!",
        "Ticket is currently being worked on.",
        "Ticket has been postponed."
      ),
      defaultValue: null,
      allowNull: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    closedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tickets",
    underscored: true,
  }
);

module.exports = Ticket;
