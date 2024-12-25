require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();

app.use(express.json());

app.post("/process-payment", async (req, res) => {
  const { amount, currency, payment_method } = req.body;

  try {
    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: payment_method,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent);

    // Return the payment intent status to the client
    res.json({ status: paymentIntent.status });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment." });
  }
});

app.listen(5050, () => {
  console.log("The server is running on port 5050");
});
