require('dotenv').config();

const config = {
    port: process.env.API_PORT || 3000,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME
}

module.exports = { config };
