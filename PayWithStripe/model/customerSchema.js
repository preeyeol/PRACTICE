const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: String,
  billingID: String,
  plan: { type: String, enum: ["none", "basic", "pro"], default: "none" },

  endDate: { type: Date, default: null },
});

module.exports = mongoose.model("Customer", customerSchema);
