const { Pool } = require('pg');

// import .env
require('dotenv').config() 
// console.log(process.env);

const pool = new Pool({
  // LOCAL TEST
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    ssl: true

    // PRODUCTION
    // connectionString: process.env.DATABASE_URL, // render connect
    // ssl: { rejectUnauthorized: false } // required
  });
// EXPORT MODULE
module.exports = pool; 


  
