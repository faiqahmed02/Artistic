// Your React Native component (e.g., CheckoutScreen.js)

import React, { useEffect, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import ButtonComp from '../../component/mainscreen/ButtonComp';
import { auth } from '../../firebaseConfig';
import { getUser } from '../../firestoreFunctions/User';

const API_URL = 'https://us-central1-zicoart-173b5.cloudfunctions.net'; // Replace with your Firebase Cloud Function URL

export default function CheckoutScreen({ amount, cus_email, cus_name }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [stripCusId, setStripeCusId] = useState("")
  const getCustomerIdFrom = () => {
    getUser(auth.currentUser.uid).then((res) => {
      console.log(res.stripeId);
      setStripeCusId(res.stripeId)
    })
  }
  const fetchPaymentSheetParams = async () => {
    if (stripCusId !== "") {
      const response = await fetch(`${API_URL}/createPaymentIntent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, cus_email, cus_name, customerId: stripCusId })
      });

      const { paymentIntent, ephemeralKey, customer } = await response.json();
      console.log(customer);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    }

  };

  const initializePaymentSheet = async (cus_id) => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
      console.log(customer);
      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: cus_name,
          email: cus_email
        },
      });

      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    getCustomerIdFrom()
    if (stripCusId) {

    initializePaymentSheet();
    }
  }, []);

  return (
    <View>
      <ButtonComp
        btnText="Checkout"
        onPress={openPaymentSheet}
        disabled={!loading}
      />
    </View>
  );
}
