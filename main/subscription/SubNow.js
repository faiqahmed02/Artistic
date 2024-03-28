import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import { auth, functions } from "../../firebaseConfig";
import { httpsCallable } from "firebase/functions";
import { useRoute } from "@react-navigation/native";
import { addUser } from "../../firestoreFunctions/User";

function SubNow({ theme, navigation }) {
  const route = useRoute();
  const { customerId, priceId } = route.params;
  const { confirmPayment, loading } = useStripe();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubscription = async () => {
    if (!paymentMethod || !customerId || !priceId ) {
      setError("Payment method not set.");
      return;
    }

    setProcessing(true);

    try {
      const processSubscription = httpsCallable(
        functions,
        "processSubscription"
      );
      const { data } = await processSubscription({
        priceID: priceId,
        customerID: customerId,
      });

      if (data.success) {
        const subData = {
          subscribe: true,
        };
        setSubscriptionSuccess(true);
        addUser(auth.currentUser.uid, subData);
        navigation.navigate("Thank You");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error processing subscription.");
      console.error("Error processing subscription:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LinearGradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image source={require("../../assets/logo.png")} />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Subscribe to Premium
        </Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{ number: "4242 4242 4242 4242" }}
          cardStyle={{ backgroundColor: "#FFFFFF", textColor: "#000000" }}
          style={{ width: "100%", height: 50, marginVertical: 20 }}
          onCardChange={(cardDetails) => setPaymentMethod(cardDetails)}
        />
        <Button
          title={processing ? "Processing..." : "Subscribe"}
          disabled={loading || processing}
          onPress={handleSubscription}
        />
        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
        {subscriptionSuccess && (
          <Text style={{ color: "green", marginTop: 10 }}>
            Subscription successful!
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}

export default withTheme(SubNow);
