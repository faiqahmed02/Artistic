// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51IzlXYEHdax3d8oTs8GSzm7fM2zr8tHcLSfuf4bQbSGWRlXCv3eRF638gvrC5hEpudinKmdsViP1A8Mre4gwpKuL00dvhiugF4");

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  const {amount, customerId, shippingMethod} = req.body;
  try {
    // eslint-disable-next-line max-len
    // const customer = customerId ? await stripe.customers.retrieve(customerId) : await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customerId},
        {apiVersion: "2020-08-27"},
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      shipping: {
        address: {
          line1: shippingMethod.streetAddress,
          city: shippingMethod.city,
          state: shippingMethod.state,
          postal_code: shippingMethod.postalCode,
          country: shippingMethod.country,
        },
        name: shippingMethod.name,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customerId,
      // eslint-disable-next-line max-len
      publishableKey: "pk_test_51IzlXYEHdax3d8oTDo9zwCBLNA7tqvVToG60ijHDZVTlkZf3j4cXGNZlOCrWrZeXwxRyWy8ovfFvLBk4dZHvM4lK00mg1kJn6V"});
  } catch (error) {
    console.error(error);
    res.status(500).send({error: "Internal Server Error"});
  }
});
