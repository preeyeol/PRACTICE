const billingSchema = require("../model/billingSchema");

const stripe = require("stripe")("your_stripe_secret_key");

const billing = async (req, res) => {
  try {
    // Step 1: Create a Stripe customer
    const stripeCustomer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        line1: req.body.address.line1,
        line2: req.body.address.line2,
        city: req.body.address.city,
        state: req.body.address.state,
        postal_code: req.body.address.postal_code,
        country: req.body.address.country,
      },
    });

    // Step 2: Save customer info in MongoDB
    const newCustomer = new billingSchema({
      stripeCustomerId: stripeCustomer.id,
      name: stripeCustomer.name,
      email: stripeCustomer.email,
      phone: stripeCustomer.phone,
      address: stripeCustomer.address,
    });

    await newCustomer.save();
    res.redirect("/bill");
    res.status(200).json({
      message: "Customer created and saved successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

module.exports = billing;
