const pgp = require('pg-promise')();
const connectionString = "postgres://localhost:5432/facebook_dbtwo"
const db = pgp(connectionString)


module.exports = db;