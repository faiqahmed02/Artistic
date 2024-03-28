import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../firebaseConfig";
import { useStripe } from "@stripe/stripe-react-native";
import { getUser } from "../../firestoreFunctions/User";

function Subscription({ theme, navigation }) {
  const [user, setUser] = useState({});
  const [subscribe, setSubscribe] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser.uid) {
      getUser(auth.currentUser.uid).then((res) => {
        if (res) {
          setLoading(false);
        }
        setUser(res);
        console.log(res);
        if (res.subscribe === true) {
          setSubscribe(true);
        } else {
          setSubscribe(false);
          setCustomerId(res.stripeId);
        }
        console.log(customerId);
      });
    }
  }, [loading]);

  return (
    <LinearGradient
      style={{ alignItems: "center", flex: 1 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView style={{ padding: 10 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.card}>
              <View style={styles.card_content}>
                <TouchableOpacity style={{ marginVertical: 10 }}>
                  <Text style={{ width: 30 }}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  Buyer Monthly
                </Text>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Text style={{ fontSize: 50, fontWeight: "700" }}>$7</Text>
                  <Text>/per month</Text>
                </View>
                <Text style={{ marginTop: 30 }}>
                  Lorem Ipsum Subscription Details Here
                </Text>
              </View>
              <ButtonComp
                btnText="Subscribe"
                onPress={() => {
                  if (!customerId) {
                    alert("Customer Id Not Exist");
                  } else {
                    navigation.navigate("Pay Now", {
                      customerId: customerId,
                      priceId: "price_1Oi3mnEHdax3d8oT40uyqpf6",
                      plan: "Buyer",
                    });
                  }
                }}
                width={341}
                disabled={subscribe}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}

export default withTheme(Subscription);

const styles = StyleSheet.create({
  card: {
    width: 341,
    // height:253,
    // maxHeight:"100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
  },
  card_content: {
    backgroundColor: "white",
    height: 208,
    borderTopRightRadius: 50,
    padding: 20,
    margin: "auto",
  },
});
