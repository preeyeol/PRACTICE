const express = require("express");
const itemRouter = express.Router();
const addItems = require("../controller/item");

itemRouter.post("/addItem", addItems);

module.exports = itemRouter;
