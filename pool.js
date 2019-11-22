require('dotenv').config();
const mysql = require('mysql2');

const config = require('./config.js');

module.exports = mysql.createPool(config).promise();
