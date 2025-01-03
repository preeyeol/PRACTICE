const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Generate a random string
function generateRandomString(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate a signature using HMAC SHA256
function generateSignature(data, secretKey) {
  return crypto.createHmac("sha256", secretKey).update(data).digest("hex");
}

app.get("/pay-with-esewa", (req, res) => {
  const order_price = parseFloat(req.query.price);

  // Validate price
  if (isNaN(order_price) || order_price <= 0) {
    return res.status(400).send("Invalid price");
  }

  const tax_amount = 0;
  const amount = order_price;
  const transaction_uuid = generateRandomString();
  const product_code = "EPAYTEST";
  const product_service_charge = 0;
  const product_delivery_charge = 0;
  const secretKey = process.env.ESEWA_SECRET_KEY;

  // Generate signature
  const signatureData = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const signature = generateSignature(signatureData, secretKey);

  // Respond with eSewa form
  res.send(`
        <body>
        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
            <input type="hidden" id="amount" name="amount" value="${amount}" required>
            <input type="hidden" id="tax_amount" name="tax_amount" value="${tax_amount}" required>
            <input type="hidden" id="total_amount" name="total_amount" value="${amount}" required>
            <input type="hidden" id="transaction_uuid" name="transaction_uuid" value="${transaction_uuid}" required>
            <input type="hidden" id="product_code" name="product_code" value="${product_code}" required>
            <input type="hidden" id="product_service_charge" name="product_service_charge" value="${product_service_charge}" required>
            <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="${product_delivery_charge}" required>
            <input type="hidden" id="success_url" name="success_url" value="http://localhost:3000/success" required>
            <input type="hidden" id="failure_url" name="failure_url" value="http://localhost:3000/failure" required>
            <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required>
            <input type="hidden" id="signature" name="signature" value="${signature}" required>
            <input type="submit" value="Pay with eSewa">
        </form>
        </body>
    `);
});

// Handle success callback
app.get("/success", (req, res) => {
  res.send("Payment was successful!");
});

// Handle failure callback
app.get("/failure", (req, res) => {
  res.send("Payment failed. Please try again.");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
