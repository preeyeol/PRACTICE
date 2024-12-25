const express = require("express");
const app = express();

app.use(express.json());

app.get("/pay-with-esewa", (req, res, next) => {
  console.log("Pay");
});

app.get("/success", () => {
  console.log("Transaction successful");
});

app.get("/failure", () => {
  console.log("Transaction failed");
});

app.listen(5010, () => {
  console.log("Server is running on port 5010");
});
