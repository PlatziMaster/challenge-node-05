// ARCHIVO DE CONFIGURACION PARA TRAER LAS VARIABLES DE ENTORNO A LA APP
require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  
};

module.exports = { config };
