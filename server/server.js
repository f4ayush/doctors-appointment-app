const mysql = require("mysql");
const fs = require("fs");
const envVariables = require("./config.js");
const path = require("path");
const express = require("express");
const connection = require("./database");
const app = express();
const getAppointment = require("./route/getAppointment");
const PORT = process.env.PORT || envVariables.port;
connection;

app.use(express.static(path.resolve(__dirname + "/../public")));
app.use("/register", getAppointment);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
