/* eslint-disable prettier/prettier */
const { Client } = require("pg");
require('dotenv').config();

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "superganda",
  database: "ai-directory",
});

module.exports = client;