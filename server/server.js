const { request, static } = require("express");

let express = require("express");
const { resolve } = require("path");
let app = express();

app.use(express.static(resolve(__dirname + "/../public")));

app.get("/getAppointment", (req, res) => {
  console.log("yes");
  res.send("this is a response");
});
app.listen(3000);
