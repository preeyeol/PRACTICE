const express = require("express");
const userRoute = express.Router();

const { signUp, login, getUsers } = require("../controller/userController");

userRoute.post("/signUp", signUp);
userRoute.post("/logIn", login);
userRoute.get("/", getUsers);

module.exports = userRoute;
