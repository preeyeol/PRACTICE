const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
// const twilio = require("twilio");
const { Infobip, AuthType } = require("@infobip-api/sdk");
// const crypto = require("crypto");
// const userSchema = require("./model/userSchema");

const app = express();
app.use(express.json());

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

let infobip = new Infobip({
  baseUrl: "YOUR_BASE_URL",
  apiKey: "YOUR_API_KEY",
  authType: AuthType.ApiKey,
});

const sendOTP = async (phone, otp) => {
  try {
    let response = await infobip.channels.whatsapp.send({
      type: "text",
      from: "447860099299",
      to: "447123456789",
      content: {
        text: "Hello World",
      },
    });

    console.log(response);
    console.log(`OTP sent to ${phone}: ${message.sid}`);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

app.post("/sendotp", async (req, res) => {
  const { phone } = req.body;
  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const otp = randomInt(100000, 999999);
  const encryptOTP = (otp) =>
    crypto.createHash("sha256").update(otp.toString()).digest("hex");

  try {
    const user = await userSchema.findOneAndUpdate(
      { phone },
      { otp, otpExpiration: Date.now() + 600000 }, // OTP expires in 10 minutes
      { upsert: true, new: true }
    );

    await sendOTP(phone, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

app.post("/verifyotp", async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await userSchema.findOne({ phone });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isOTPValid = user.otp === otp && Date.now() < user.otpExpiration;
    if (!isOTPValid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

mongoose
  .connect("mongodb://localhost:27017/mobile-otp")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Cannot connect to mongoDB", err);
  });

app.listen(5005, () => {
  console.log("The server is running on port 5005");
});