require('dotenv').config();

const config = {
    port: process.env.PORT,
    mondoUri: process.env.DB_URL,
    dbName: process.env.DB_NAME
}

module.exports = config