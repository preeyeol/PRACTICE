const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
require("dotenv").config();

app.use(express.json());

app.post("/nodemailer/sendgrid", (req, res) => {
  try {
    const { from, to, subject, text } = req.body;
    const transport = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: "<h1>Hello world!</h1>",
    });

    res.status(200).json({ message: "Email Sent Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email not sent" });
  }
});

app.listen(2323, () => {
  console.log("The sertver is running on port 2323");
});
