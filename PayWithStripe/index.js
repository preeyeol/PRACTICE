require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

const bill = require("./route/billRoute");

app.use("/", bill);

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
      shipping_address_collection: {
        allowed_countries: ["US", "BR", "NE", "NP"],
      },
      success_url: `${process.env.BASE_URL}/complete?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    console.log(paymentIntent);

    res.redirect(paymentIntent.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message || "An error occurred while processing the payment.",
    });
  }
});

app.get("/complete", async (req, res) => {
  const sessionId = req.query.session; // Ensure session ID is retrieved
  if (!sessionId) {
    return res.status(400).send("Session ID is missing");
  }
  console.log(sessionId);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session);
    res.status(200).send("Your payment was successful");
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).send("There was an error processing your payment.");
  }
});

app.get("/cancel", (req, res) => {
  res.redirect("/");
});

mongoose
  .connect("mongodb://localhost:27017/payment")
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch(() => {
    console.log("Can't connect to mongodb");
  });

app.listen(5050, () => {
  console.log("The server is running on port 5050");
});
