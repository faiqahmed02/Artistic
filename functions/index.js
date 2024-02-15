// const functions = require("firebase-functions");
// const admin = require("firebase-admin");

// eslint-disable-next-line max-len
// const stripe = require("stripe")("sk_test_51IzlXYEHdax3d8oTs8GSzm7fM2zr8tHcLSfuf4bQbSGWRlXCv3eRF638gvrC5hEpudinKmdsViP1A8Mre4gwpKuL00dvhiugF4");

// admin.initializeApp();
// eslint-disable-next-line max-len
// exports.createPaymentIntent = functions.https.onCall(async (data, context) => {

//     // Check if the user is authenticated
//   if (!context.auth) {
//     // eslint-disable-next-line max-len
// eslint-disable-next-line max-len
//     throw new functions.https.HttpsError("unauthenticated", "You must be authenticated.");
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: data.amount,
//       currency: "usd", // or your desired currency
//     });

//     return {clientSecret: paymentIntent.client_secret};
//   } catch (error) {
//     // eslint-disable-next-line max-len
//     console.error("Error creating Payment Intent:", error.message);

// eslint-disable-next-line max-len
//     throw new functions.https.HttpsError("internal", "Error creating Payment Intent.");
//   }
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51IzlXYEHdax3d8oTs8GSzm7fM2zr8tHcLSfuf4bQbSGWRlXCv3eRF638gvrC5hEpudinKmdsViP1A8Mre4gwpKuL00dvhiugF4");

admin.initializeApp();
// eslint-disable-next-line max-len
exports.handleWebhookEvents = functions.https.onRequest(async (req, res) => {
  // eslint-disable-next-line max-len
  const endpointSecret = "whsec_1OkFLMYAn12MRfhkiG0JAVvzDq2Hyf0V";

  try {
    const sig = req.headers["stripe-signature"];
    // eslint-disable-next-line max-len
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    // Handle the Stripe event here
    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle successful payment intent
        break;
      case "payment_intent.payment_failed":
        // Handle failed payment intent
        break;
        // Add more event types as needed

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send("Webhook received successfully");
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
// eslint-disable-next-line max-len
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    // Validate user authentication
    if (!context.uid) {
      // eslint-disable-next-line max-len
      throw new functions.https.HttpsError("unauthenticated", "You must be authenticated.");
    }

    // Validate payment amount
    if (data.amount < 50) {
      // eslint-disable-next-line max-len
      throw new functions.https.HttpsError("invalid-argument", "Amount must be at least $0.50 USD.");
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: "usd",
    });

    return {clientSecret: paymentIntent.client_secret};
  } catch (error) {
    // eslint-disable-next-line max-len
    console.error("Error creating Payment Intent:", error.message);
    // eslint-disable-next-line max-len
    throw new functions.https.HttpsError("internal", "Error creating Payment Intent.");
  }
});
