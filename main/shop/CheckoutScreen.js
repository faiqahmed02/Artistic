// Your React Native component (e.g., CheckoutScreen.js)

import React, { useEffect, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import ButtonComp from '../../component/mainscreen/ButtonComp';
import { auth } from '../../firebaseConfig';

const API_URL = 'https://us-central1-zicoart-173b5.cloudfunctions.net'; // Replace with your Firebase Cloud Function URL

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/createPaymentIntent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount:10000})
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
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
    initializePaymentSheet();
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
