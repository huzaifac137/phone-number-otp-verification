const express = require("express");
const app = express();
const Twilio = require("twilio");
require("dotenv").config();

// Replace with your Twilio account SID and auth token
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const messagingServiceId = process.env.MESSAGING_SERVICE_ID;
const verifyServiceId = process.env.VERIFY_SERVICE_ID;
const mytwiliophoneN = process.env.TWILIO_PHONE_NO;

// Initialize the Twilio client
const client = new Twilio(accountSid, authToken);

// Use middleware to parse incoming request bodies
app.use(express.json());

// Endpoint for sending the OTP
app.post("/send-otp", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Send the OTP to the provided phone number
    const message = await client.verify.v2
      .services(verifyServiceId)
      .verifications.create({ to: phoneNumber, channel: "sms" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint for verifying the OTP

app.post("/verify-otp", async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    // Verify the OTP using the Twilio Verify API
    const verificationCheck = await client.verify.v2
      .services(verifyServiceId)
      .verificationChecks.create({
        to: `${phoneNumber}`,
        code: otp,
      });

    if (verificationCheck.status === "approved") {
      res.json({ isVerified: true });
    } else {
      res.json({ isVerified: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Express app
app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
