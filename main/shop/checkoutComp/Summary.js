import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../../component/mainscreen/ButtonComp";
import { ScrollView } from "react-native";
import CheckoutScreen from "../CheckoutScreen";
import { auth } from "../../../firebaseConfig";

// Payment
import { getUser } from "../../../firestoreFunctions/User";
import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import { cartReducerEmpty } from "../../../store/rootSlice";

const API_URL = "https://us-central1-zicoart-173b5.cloudfunctions.net"; // Replace with your Firebase Cloud Function URL

function Summary({
  formData,
  setFormData,
  onPrevious,
  onNext,
  onSubmit,
  theme,
  handleCancel,
  // navigation,
}) {
  const state = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  // console.log(formData);

  const totalAmount = state
    ? state.reduce((acc, product) => {
        return acc + product.price * product.cartQty;
      }, 0)
    : 0;

  console.log(state);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [stripCusId, setStripeCusId] = useState("");
  const navigation = useNavigation();
  const [artId, setArtId] = useState([]);
  const [artistId, setArtistId] = useState([]);
  const getCustomerIdFrom = () => {
    getUser(auth.currentUser.uid).then((res) => {
      // console.log(res.stripeId);
      setStripeCusId(res.stripeId);
    });
  };
  const fetchPaymentSheetParams = async () => {
    getCustomerIdFrom();
    // if (stripCusId !== "") {
    const response = await fetch(`${API_URL}/createPaymentIntent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount * 100,
        // cus_email,
        // cus_name,
        customerId: stripCusId,
        shippingMethod: {
          streetAddress: formData.field1.Street_Address,
          city: formData.field1.City,
          state: formData.field1.State,
          postalCode: formData.field1.Postal_Code,
          country: formData.field1.Country,
          name: formData.field1.Full_Name,
        },
      }),
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();
    // console.log(customer);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
    // }
  };

  const initializePaymentSheet = async (cus_id) => {
    try {
      const { paymentIntent, ephemeralKey, customer, publishableKey } =
        await fetchPaymentSheetParams();
      // console.log(customer);
      const { error } = await initPaymentSheet({
        merchantDisplayName: "ZicoArt, Inc.",
        customerId: stripCusId,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
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
      // Alert.alert("Success", "Your order is confirmed!");
      setTimeout(() => {
        dispatch(cartReducerEmpty());
        // onNext();
        navigation.navigate("Thank You", {
          buyerId: auth.currentUser.uid,
          artid: artId,
          artistid: artistId,
        });
        dispatch(cartReducerEmpty());
      }, 2000);
    }
  };

  const mergeData = () => {
    const allArtIds = state.map((item) => item.id);
    const allArtistIds = state.map((item) => item.createdBy);
    setArtId(allArtIds);
    setArtistId(allArtistIds);
    console.log(artistId);
  };

  useEffect(() => {
    // getCustomerIdFrom()
    // if (stripCusId) {

    if (totalAmount > 0) {
      mergeData();
      initializePaymentSheet();
    }

    // }
  }, [stripCusId, totalAmount, formData.field1.City]);
  const handleNext = () => {
    setFormData({ ...formData, field1 });
    onSubmit();
  };

  return (
    <ScrollView>
      <View
        style={{
          marginLeft: 10,
          marginRight: 10,
          // justifyContent:"flex-start",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "left",
              width: 380,
              maxWidth: "100%",
              fontSize: 20,
              fontWeight: 700,
              lineHeight: 40,
              letterSpacing: 0,

              // backgroundColor:"black"
            }}
          >
            Summary
          </Text>
        </View>
        {state !== null
          ? state.map((d, i) => {
              return (
                <View
                  key={i}
                  style={{
                    // flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    backgroundColor: "white",
                    // alignItems: "center",
                    height: "auto",
                    // width: "90%",
                    height: 100,
                    padding: 10,
                    // paddingTop:100,
                    //   margin: 10,
                    marginTop: 10,
                  }}
                >
                  <View>
                    <Image
                      source={require("../../../assets/product_img_1.png")}
                      style={{ width: 79, height: 82 }}
                    />
                  </View>
                  <View style={{ padding: 10, width: "75%" }}>
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: "400",
                        lineHeight: 16,
                        letterSpacing: 0,
                        textAlign: "left",
                        color: "#29ABE2",
                      }}
                    >
                      $ {d.price} x 4
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        lineHeight: 22,
                        letterSpacing: 0,
                        textAlign: "left",
                        textTransform: "uppercase",
                      }}
                    >
                      {d.artworkName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "400",
                        lineHeight: 16,
                        letterSpacing: 0,
                        textAlign: "left",
                        color: "#868889",
                      }}
                    >
                      {d.description}
                    </Text>
                  </View>
                </View>
              );
            })
          : ""}
        <View
          style={{
            borderBottomWidth: 3,
            borderTopWidth: 3,
            borderColor: "#BBBBBBCC",
            padding: 10,
            marginTop: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              width: 340,
              maxWidth: "100%",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 40,
              letterSpacing: 0,

              // backgroundColor:"black"
            }}
          >
            Shipping Address
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 20,
              letterSpacing: 0,
              textAlign: "left",
              color: "#868889",
            }}
          >
            {formData.field1
              ? formData.field1.Street_Address +
                "," +
                formData.field1.Apartment +
                "," +
                formData.field1.City +
                "," +
                formData.field1.State +
                "," +
                formData.field1.Country +
                "," +
                formData.field1.Postal_Code
              : ""}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            // width: "100%",
            padding: 10,
          }}
        >
          {/* <Text
            style={{
              textAlign: "left",
              width: 340,
              maxWidth: "100%",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 40,
              letterSpacing: 0,

              // backgroundColor:"black"
            }}
          >
            Payment
          </Text>
          <Text>Card Payment</Text>
          <Text
            style={{
              color: theme.colors.linkColor,
            }}
          >
            5678 **** ****
          </Text> */}
          <TouchableOpacity onPress={onPrevious}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 400,
                lineHeight: 20,
                letterSpacing: 0,
                marginTop: 10,
                borderBottomWidth: 1,
                borderColor: "black",
                // width: 52,
                paddingBottom: 4,
              }}
            >
              Change Shipping Address
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ButtonComp btnText="Pay" onPress={onSubmit} /> */}
        <View>
          <ButtonComp
            btnText="Checkout"
            onPress={openPaymentSheet}
            disabled={!loading}
          />
        </View>
        {/* <CheckoutScreen
          amount={totalAmount * 100}
          cus_email={auth.currentUser.email}
          cus_name={auth.currentUser.displayName}
          navigation={navigation}
        /> */}
        <TouchableOpacity onPress={onPrevious}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              lineHeight: 18,
              letterSpacing: 0,
              textAlign: "center",
              color: "#29ABE2",
              marginTop: 10,
            }}
          >
            Update Shipping Details
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default withTheme(Summary);
