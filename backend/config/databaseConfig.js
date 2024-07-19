if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const { Sequelize } = require("sequelize");
  const pg = require("pg");
  const logDetails = require('../utils/logUtil');
  
  const dbUrl = process.env.POSTGRES_URL;
  
  if (!dbUrl) {
    throw new Error("POSTGRES_URL is not defined in the environment variables.");
  }
  
  logDetails("Connecting to the database", { dbUrl });
  
  const db = new Sequelize(dbUrl, {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      schema: "public",
    },
  });
  
  db.authenticate()
    .then(() => logDetails("Database connection established successfully."))
    .catch(err => logDetails("Unable to connect to the database:", { error: err }));
  
  module.exports = db;