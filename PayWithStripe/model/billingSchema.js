const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  stripeCustomerId: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: {
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Customer", billingSchema);
