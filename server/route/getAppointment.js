let connection = require("../database");
const express = require("express");
const path = require("path");
const router = express.Router();

let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let tableName = `${date}_${month}_${year}`;

router.post("/getAppointment", (req, res) => {
  connection.query(
    `create table if not exists ${tableName} (App_num int(25) auto_increment primary key, Name text(25), Age int(25), Gender text(25), Address text(500), Email text(255), lastVisited text(50))`,
    (error, results, fields) => {
      if (error) throw error;
      // console.log(results);
    }
  );

  // console.log(req.body.name);
  let name = req.body.name;
  let email = req.body.email;
  let gender = req.body.gender;
  let age = req.body.age;
  let lastVisited = req.body.lastVisited;
  let address = req.body.address;

  connection.query(
    `insert into ${tableName}(Name, Age, Gender, Email, Address, lastVisited) values('${name}','${age}','${gender}','${email}','${address}','${lastVisited}')`,
    (error, results, fields) => {
      if (error) throw error;
      // console.log(results);
      res.sendFile(path.resolve(__dirname + "/../../public/payment.html"));
    }
  );
});

router.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error!" });
});
module.exports = router;
