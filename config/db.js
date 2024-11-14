//gestisce connessione al DB
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: __dirname + "/.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    /*By default, Sequelize will log every SQL query it performs to the console. This may lead to sensitive data (e.g. passwords / hashes) being leaked to the logs. */
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
