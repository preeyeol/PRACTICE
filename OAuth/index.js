const express = require("express");

require("dotenv").config();

const app = express();

const oauthRouter = require("./route/oAuth");

app.use("/api/oauth", oauthRouter);

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
