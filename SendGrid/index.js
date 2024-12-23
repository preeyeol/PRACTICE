const express = require("express");
const mail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();
app.use(express.json());

mail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/email/send", (req, res) => {
  let { to, from, subject, text } = req.body;
  console.log(req.body);
  const message = {
    to: to,
    // cc: ["__email1@domain.com__", "__email2@domain.com__"],
    // bcc: ["__email1@domain.com__", "__email2@domain.com__"],
    from: "preeyeol27@gmail.com",
    // replyTo: "hi@whoisrishav.com",
    subject: subject,
    text: text,
    // attachments: [],
  };
  mail
    .send(message)
    .then(() => {
      res.status(200).send({
        message: "Email sent successfully",
      });
    })
    .catch((err) => {
      console.log(err.response.body);
      res.status(500).send({
        message: "Email not send",
        error: err.message,
      });
    });
});

app.listen(2023, () => {
  console.log("Server is running on port 2023");
});
