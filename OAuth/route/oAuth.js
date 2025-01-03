const express = require("express");
const oauthRouter = express.Router();

const {
  handleGoogleConsentScreen,
  onSuccessGoogleOAuth,
  verifyToken,
  signout,
} = require("../controller/oauthController");

oauthRouter.get("/google", handleGoogleConsentScreen);

oauthRouter.get("/google/success", onSuccessGoogleOAuth);

oauthRouter.post("/verify/:token", verifyToken);

oauthRouter.get("/signout", signout);

module.exports = oauthRouter;
