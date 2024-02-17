import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Button, withTheme } from "react-native-paper";
import { app, auth, db, functions } from "../../firebaseConfig";
import { useSelector } from "react-redux";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { CardField, StripeProvider, useStripe } from '@stripe/stripe-react-native';
// import { createCheckoutSession } from "../stripe/createCheckoutSession";
// import usePremiumStatus from "../stripe/usePremiumStatus";
// import firebase from 'firebase/app';
import 'firebase/functions';
import { httpsCallable } from "firebase/functions";
import { doc, getDoc, updateDoc } from "firebase/firestore";


function Profile({ theme, navigation }) {
  const url = auth.currentUser.photoURL
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const createPaymentIntent = httpsCallable(functions, 'createPaymentIntent');
  useEffect(() => {
    const updateUserData = () => {
      updateProfile(auth.currentUser, {
        displayName: "Alex Smith", photoURL: "https://example.com/jane-q-user/profile.jpg", 
      }).then(() => {
        // Profile updated!
        console.log("updated");
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
    }
    const unsubscribe = () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        checkSubscriptionStatus(auth.currentUser.uid);
       
      } else {
        setUser(null);
        setIsSubscribed(false);
      }
    }

    updateUserData()
    return () => unsubscribe();
  }, []);

 

  const checkSubscriptionStatus = async (userId) => {
    // Check the user's subscription status in Firestore
    // const userDoc = await db.collection('users').doc(userId).get();
    // const userData = userDoc.data();
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }


    setIsSubscribed(userData?.isSubscribed || false);
  };

  const handleSubscription = async () => {
    let data = {
      amount: 10
    };
    try {
      const response = await createPaymentIntent(data, auth.currentUser);
      const clientSecret = response.data.clientSecret;

      // Initialize the payment sheet
      await initPaymentSheet({
        customerId: user.uid, // Use your user ID as the customer ID
        paymentIntentClientSecret: clientSecret,
      });

      // Present the payment sheet
      const { error, paymentIntent } = await presentPaymentSheet();

      if (error) {
        console.log('Payment failed:', error.message);
        // Handle payment failure
      } else if (paymentIntent.status === 'succeeded') {
        // Update the user's subscription status in Firestore
        // await db.collection('users').doc(user.uid).update({ isSubscribed: true });
        const washingtonRef = doc(db, "users", auth.currentUser.uid);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
          isSubscribed: true
        });
        setIsSubscribed(true);
        console.log('Subscription successful!');
      } else {
        console.log('Payment incomplete:', paymentIntent.status);
        // Handle incomplete payment (optional)
      }
    } catch (error) {
      console.error('Error handling subscription:', error.message);
      // Handle other errors
    }
  };


  // console.log(url);
  return (auth.currentUser ?
    <LinearGradient
      style={{ alignItems: "center" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: 20,
            width: '100%',
            // backgroundColor:"black",
            // marginHorizontal:20
            padding: 10,
          }}
        >
          <View style={style.imgg} >
            <Image style={style.imgg} source={url ? url : require('../../assets/avatart.png')} width={100} height={100} />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Full Name</Text>
            {/* <Text>{user.username}</Text> */}
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Store Name</Text>
            {/* <Text>{user.username}</Text> */}
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Email Address</Text>
            <Text>{auth.currentUser.email}</Text>
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Phone Number</Text>
            <Text>{auth.currentUser.phoneNumber ? auth.currentUser.phoneNumber : "+11111111111"}</Text>
          </View>

          <ButtonComp btnText={"Edit"} />
          {auth.currentUser ? (
            <View>
              <Text>Welcome, {auth.currentUser.email}!</Text>
              {isSubscribed ? (
                <Text>You are subscribed!</Text>
              ) : (
                <ButtonComp btnText="Subscribe" onPress={() => navigation.navigate("Checkout Screen")} />
              )}
              {/* <ButtonComp btnText="Logout" onPress={handleLogout} /> */}
            </View>
          ) : (
            <Text>Please log in to continue.</Text>
          )}
        </View>
      </View>
    </LinearGradient>
    : navigation.navigate("Login")
  )
}

export default withTheme(Profile);


const style = StyleSheet.create({
  main_con: {

  },
  imgg: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
})
