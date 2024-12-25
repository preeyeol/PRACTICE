require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/checkout", async (req, res) => {
  try {
    const paymentIntent = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Accessories",
            },
            unit_amount: 50 * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Birthday Cake",
            },
            unit_amount: 20 * 100,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/complete`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    res.redirect(paymentIntent.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "An error occurred while processing the payment.",
    });
  }
});

app.get("/complete", (req, res) => {
  res.send("Your payment was successful");
});

app.get("/cancel", (req, res) => {
  res.redirect("/");
});

app.listen(5050, () => {
  console.log("The server is running on port 5050");
});
