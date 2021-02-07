const envVariables = require("./config.js");
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const getAppointment = require("./route/getAppointment");
const PORT = process.env.PORT || envVariables.port;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname + "/../public")));
app.use("/register", require("./route/getAppointment"));

var Razorpay = require("razorpay");
// var bodyParser = require("body-parser");

let instance = new Razorpay({
  key_id: "rzp_test_IVEXVV6NKgfz67", // your `KEY_ID`
  key_secret: "hDlhf9mLA13fp9p5G9v2KKkP", // your `KEY_SECRET`
});

app.post("/api/payment/order", (req, res) => {
  params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});

app.get("/invoices", (req, res) => {
  console.log(req);
});

app.post("/api/payment/verify", (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "hDlhf9mLA13fp9p5G9v2KKkP")
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "success" };
  res.send(response);
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error!" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
