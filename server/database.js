const mysql = require("mysql");
const envVariables = require("./config.js");

const connection = mysql.createConnection({
  host: envVariables.host,
  database: envVariables.database,
  user: envVariables.user,
  password: envVariables.password,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection established!");
  }
});

console.log("yes it works!");

module.exports = connection;
