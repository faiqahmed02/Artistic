import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { cartReducer, logOut } from "../../store/rootSlice";
import Checkout from "./Checkout";

function Cart({ theme, navigation }) {
  const state = useSelector((state) => state.cartState);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState([]);
  // console.log(user);
  const minusCount = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };
  const addCount = (d) => {
    if (count !== d) {
      setCount(count + 1);
    } else {
      alert("Max Prduct Item Reach");
    }
  };
  const checkForCartSTate = () => {
    if (state) {
      setCart(state);
    }
    // console.log(cart);
  };
  const handleDelete = (itemId) => {
    const items = cart.filter((item) => item.id !== itemId);
    dispatch(cartReducer(items));
  };
  useEffect(() => {
    checkForCartSTate();
  }, [state]);
  // dispatch(logOut())
  const checkOutBtn = () => {
    if (user) {
      if (!cart.length) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Checkout");
      }
    } else if (!cart.length) {
      alert("Add Some Product First");
    } else {
      navigation.navigate("Login");
    }
    {
      // console.log("clicked");
    }
    // console.log("clicked");
  };
  return (
    <LinearGradient
      style={{ alignItems: "center" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <ScrollView>
        {cart !== null ? (
          cart.map((d, i) => {
            return (
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
                key={i}
              >
                <View
                  style={{
                    // flex: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    backgroundColor: "white",
                    // alignItems: "center",
                    height: "auto",
                    width: "90%",
                    height: 100,
                    padding: 10,
                    // paddingTop:100,
                    margin: 10,
                    marginTop: 50,
                  }}
                >
                  <View>
                    <Image
                      source={require("../../assets/product_img_1.png")}
                      style={{ width: 79, height: 82 }}
                    />
                  </View>
                  <View style={{ width: "62%", paddingTop: 10 }}>
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
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "column-reverse",
                      // width: "20%",
                      alignItems: "center",
                      alignContent: "center",
                      textAlign: "center",
                      // backgroundColor:"black"
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        // backgroundColor: theme.colors.linkColor,
                        padding: 7,
                        colors: "whiet",
                        width: 40,
                      }}
                      onPress={() => minusCount()}
                    >
                      <FontAwesomeIcon
                        icon={faMinus}
                        color={theme.colors.linkColor}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        // height: "100%",
                        width: 40,
                        alignItems: "center",
                        textAlign: "center",
                        alignContent: "center",
                        fontSize: 18,
                        fontWeight: "500",
                        lineHeight: 22,
                        letterSpacing: 0,
                        right: 3,
                        // top: 8,
                        // textAlign: "left"
                      }}
                    >
                      {d.cartQty}
                    </Text>
                    <TouchableOpacity
                      style={{
                        // backgroundColor: theme.colors.linkColor,
                        padding: 7,
                        width: 40,
                        // top: 12,
                        colors: "whiet",
                      }}
                      onPress={() => addCount(d.quantity, d.cartQty)}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        color={theme.colors.linkColor}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.colors.linkColor,
                      padding: 10,
                      height: 38,
                      borderRadius: 50,
                      position: "absolute",
                      right: -15,
                      top: -14,
                    }}
                    onPress={() => handleDelete(d.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              height: 700,
              width: 200,
              maxWidth:"100%",
              backgroundColor: theme.colors.linkColor,
            }}
          >
            <Text>Hellow</Text>
          </View>
        )}
      </ScrollView>
      {cart ? (
        <ButtonComp
          onPress={() => checkOutBtn()}
          btnText={!cart.length ? "Add Product" : "CHECKOUT"}
        />
      ) : (
        ""
      )}
    </LinearGradient>
  );
}

export default withTheme(Cart);
