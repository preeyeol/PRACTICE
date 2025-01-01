const mongoose = require("mongoose");

const checkoutSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  customerEmail: { type: String, required: true },
  customerName: { type: String },
  amountTotal: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  paymentIntent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CheckoutSession = mongoose.model(
  "CheckoutSession",
  checkoutSessionSchema
);

module.exports = CheckoutSession;
