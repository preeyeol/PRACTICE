require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Router = require("./route/esewaRoute");
const itemRouter = require("./route/addItem");

app.use(express.json());
app.use(bodyParser.json());

app.use("/", Router);
app.use("/", itemRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});

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
