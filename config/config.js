require("dotenv").config({ path: __dirname + "/.env" }); // Carica le variabili di ambiente

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10), // Converte la porta in numero
    dialect: "postgres",
  },
  // Definisci qui le altre configurazioni, se necessarie
};
