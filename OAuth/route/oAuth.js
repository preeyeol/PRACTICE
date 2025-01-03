const express = require("express");
const oauthRouter = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

oauthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

oauthRouter.get(
  "/google/success",
  passport.authenticate("google", { failureRedirect: "/api/user/logIn" }),
  function (req, res) {
    console.log(req.user);
    res.json({
      message: "Successfully logged in with google",
    });
    res.redirect("/");
  }
);
module.exports = oauthRouter;
