import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import ButtonComp from '../../component/mainscreen/ButtonComp';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../firebaseConfig';
import { useStripe } from '@stripe/stripe-react-native';

function Subscription({ theme, navigation }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await db.collection('products').doc('your_product_id').get();
        if (productDoc.exists) {
          setProduct(productDoc.data());
        } else {
          console.error('Product not found.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const initializePaymentSheet = async () => {
    const { paymentSheet, error } = await initPaymentSheet({
      paymentIntentClientSecret: 'YOUR_STRIPE_PAYMENT_INTENT_SECRET',
    });

    if (error) {
      console.error('Error initializing PaymentSheet:', error);
    } else {
      // Store the PaymentSheet instance for later use
      // (e.g., when the user presses the subscribe button)
      // paymentSheet.current = paymentSheet;
    }
  };

  const handleSubscribe = async () => {
    // Implement subscription logic here
    // (e.g., create a user in Firestore, trigger Cloud Function to create Stripe customer and subscription)

    const userRef = await firestore.collection('users').add({ email: 'user@example.com' });
    const subscriptionRef = await firestore.collection('subscriptions').add({
      userId: userRef.id,
      priceId: 'your_price_id', // Replace with the actual price ID
    });

    // Trigger Cloud Function to create Stripe customer and subscription
    // await fetch(`https://us-central1-your-firebase-project-id.cloudfunctions.net/createStripeCustomer`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ userId: userRef.id }),
    // });

    await fetch(`https://us-central1-your-firebase-project-id.cloudfunctions.net/createStripeSubscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userRef.id, priceId: 'your_price_id' }),
    });

    // Present PaymentSheet after creating customer and subscription
    await presentPaymentSheet({
      clientSecret: 'YOUR_STRIPE_PAYMENT_INTENT_SECRET',
    });
  };
    return (
        <LinearGradient
            style={{ alignItems: "center"}}
            colors={[theme.colors.myOwnColor, "transparent"]}
        >
            <ScrollView style={{padding: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.card}>
                    <View style={styles.card_content}>
                        <TouchableOpacity style={{ marginVertical: 10 }}>
                            <Text style={{ width: 30 }}>
                                <FontAwesomeIcon icon={faCheck} />
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>Buyer Monthly</Text>
                        <View style={{ flexDirection: 'row', alignItems: "baseline" }}>
                            <Text style={{ fontSize: 50, fontWeight: "700" }}>$7</Text>
                            <Text>/per month</Text>
                        </View>
                        <Text style={{ marginTop: 30 }}>Lorem Ipsum Subscription Details Here</Text>

                    </View>
                    <ButtonComp btnText="Subscribe" onPress={() => navigation.navigate("Home")} width={341} />
                </View>
            </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default withTheme(Subscription)

const styles = StyleSheet.create({
    card: {
        width: 341,
        // height:253,
        // maxHeight:"100%",
        maxWidth: "100%",
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 20,



    },
    card_content: {
        backgroundColor: "white",
        height: 208,
        borderTopRightRadius: 50,
        padding: 20,
        margin: 'auto'
    }
})