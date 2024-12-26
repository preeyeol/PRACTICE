const express = require("express");
const billing = require("../controller/billController");
const bill = express.Router();

bill.get("/bill", billing);

module.exports = bill;
