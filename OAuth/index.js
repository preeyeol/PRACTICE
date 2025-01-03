require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
app.use(express.json());

const oauthRouter = require("./route/oAuth");
const userRoute = require("./route/userRoute");

app.use("/api/user", userRoute);
app.use("/api/", oauthRouter);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/google/success",
    },
    function (accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });

      console.log(profile);
      return cb(null, profile);
    }
  )
);

mongoose
  .connect("mongodb://127.0.0.1:27017/oauth")
  .then(() => {
    console.log("Connected to mongoDb");
  })
  .catch((err) => {
    console.log("Can't connect to mongoDB");
    console.log(err);
  });

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
