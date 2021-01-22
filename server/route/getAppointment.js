let connection = require("../database");
const express = require("express");
const router = express.Router();

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let tableName = `${date}+_+${month}+_+${year}`;

router.post("/appointment", (req, res) => {
  connection.query(
    `create table if not exists ${tableName} (App_num int(25) auto_increment primary key, Name text(25), Age int(25), Address text(500), lastVisited text(50))`,
    (error, results, fields) => {
      if (error) throw error;
      if (results.warningCount == 0) {
        // code for adding patient
      }
    }
  );
});

module.exports = router;
