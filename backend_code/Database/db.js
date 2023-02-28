const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/vowelWeb")
  .then(() => {
    console.log("Database Connect Successfully");
  })
  .catch((err) => {
    console.log("Database not cnnected");
  });
