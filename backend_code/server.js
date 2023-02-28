const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
let productRoute = require("./routes/product");
let orderRoute = require("./routes/order");

enableCORS(app);
app.use(cors());

function enableCORS(expressInstance) {
  expressInstance.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
  });
}

require("./Database/db");

app.options("*", cors());
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

app.listen(5000, () => {
  console.log("Port is Connected on 5000");
});
