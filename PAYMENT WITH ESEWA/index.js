const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/esewa")
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Can;t Connect to mongodb", err);
  });

app.listen(5020, () => {
  console.log("Server is running on port 5020");
});
