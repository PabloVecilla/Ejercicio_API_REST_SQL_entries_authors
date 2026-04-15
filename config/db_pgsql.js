const { Pool } = require('pg');

// import .env
require('dotenv').config() 
// console.log(process.env);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
  });
// EXPORT MODULE
module.exports = pool; 