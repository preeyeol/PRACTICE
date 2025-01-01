const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get("/pay-with-esewa", (req, res, next) => {
  let order_price = req.query.price;
  let tax_amount = 0;
  let amount = order_price;
  let transaction_uuid = generateRandomString();
  let product_code = "EPAYTEST";
  let product_service_charge = 0;
  let product_delivery_charge = 0;
  let secretKey = "8gBm/:&EnhH.1/q";
  let signature = generateSignature(
    `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
    secretKey
  );

  res.send(`
    <body>
        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
            <input type="text" id="amount" name="amount" value="${amount}" required>
            <input type="text" id="tax_amount" name="tax_amount" value ="${tax_amount}" required>
            <input type="text" id="total_amount" name="total_amount" value="${amount}" required>
            <input type="text" id="transaction_uuid" name="transaction_uuid" value="${transaction_uuid}" required>
            <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required>
            <input type="text" id="product_service_charge" name="product_service_charge" value="${product_service_charge}" required>
            <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="${product_delivery_charge}" required>\
            <input type="text" id="success_url" name="success_url" value="http://localhost:3000/success" required>
            <input type="text" id="failure_url" name="failure_url" value="http://localhost:3000/failure" required>
            <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required>
            <input type="text" id="signature" name="signature" value="${signature}" required>
            <input value="Submit" type="submit">
         </form>
    </body>
    `);
});

app.get("/success", () => {
  console.log("Transaction successful");
});

app.get("/failure", () => {
  console.log("Transaction failed");
});

app.listen(5020, () => {
  console.log("Server is running on port 5020");
});
