import { faMinimize, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Image, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, withTheme } from "react-native-paper";
import RelatedProduct from "./RelatedProduct";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { cartReducer } from "../../store/rootSlice";

const obj = {
  artworkDetails: {
    artistName: "John Doe",
    artWorkName: "Rocky Painted",
    price: "78.00",
    type: "Oil,Acrylic,Sculpture",
    size: "A3",
    weight: "1 KG",
    artStory: "That was something new to watch.",
  },
};

function SingleProduct({ theme, navigation }) {
  const [count, setCount] = useState(1);
  const route = useRoute();
  const { productId } = route.params;
  // console.log(productId);
  const [productCart, setProductCart] = useState([]);
  const cartState = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartState);

  const minusCount = () => {
    if (count !== 1) {
      setCount(count - 1);
    }
  };
  const addCount = () => {
    if (count !== productId.quantity) {
      setCount(count + 1);
    }
  };
  const cartData = {
    artistName: productId.artistName,
    artworkName: productId.artworkName,
    artworkSize: productId.artworkSize,
    artworkType: productId.artworkType,
    artworkWeight: productId.artworkWeight,
    description: productId.description,
    id: productId.id,
    price: productId.price,
    quantity: productId.quantity,
    cartQty: count,
  };

  const addToCart = () => {
   
    // Check if the product is already in the productCart
    const isProductInCart = cartState.some((item) => item.id === productId.id);

    if (!isProductInCart) {
      // Product doesn't exist in the productCart, add it
      // dispatch();
      setProductCart([...cartState, cartData]);
      // dispatch(cartReducer(productCart));
      // console.log("Product added to productCart:", cartData);
      console.log(cartData);
    } else {
      // console.log("Product already in the productCart:", cartData);
      // dispatch(cartReducer(productCart));
    }
  };

  useEffect(() => {
    dispatch(cartReducer(productCart));
  }, [productCart]);
  // console.log(JSON.stringify(cartState) + " " + "Haan Han My hi hu");
  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            height: "100%",
            // paddingTop:320
          }}
        >
          <Image
            source={require("../../assets/single_product.png")}
            style={{
              width: 343,
              height: 197,
              borderRadius: 5,
              maxWidth:"100%"
            }}
          />
          <View
            style={{
              // flex:2
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: "65%",
              }}
            >

          <Button  onPress={() => navigation.navigate("ArView")}>View in AR</Button>
              <Text style={styles.productTitle}>Artwork Details</Text>
              <View style={styles.productmeta}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Artist Name:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.artistName}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Artwork Name:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.artworkName}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Price:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.price}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Type:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.artworkType}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Size:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.artworkSize}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Weight:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.artworkWeight}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.text}>Art Story:</Text>
                  <Text style={[styles.text, { fontWeight: "600" }]}>
                    {productId.description}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                width: "30%",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.linkColor,
                  padding: 10,
                  colors: "whiet",
                }}
                onPress={() => minusCount()}
              >
                <FontAwesomeIcon icon={faMinus} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  margin: "auto",
                  height: "100%",
                  alignItems: "center",
                  textAlign: "center",
                  alignContent: "center",
                  fontSize: 18,
                  fontWeight: "500",
                  lineHeight: 22,
                  letterSpacing: 0,
                  top: 8,
                  // textAlign: "left"
                }}
              >
                {count}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.linkColor,
                  padding: 10,
                  colors: "whiet",
                }}
                onPress={() => addCount()}
              >
                <FontAwesomeIcon icon={faPlus} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {/* End Banner Product Details */}
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 20,
                letterSpacing: 0,
                textAlign: "left",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              ornare ornare pulvinar. Etiam pellentesque neque et lorem aliquam
              maximus. Fusce finibus Read More.
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              width: Dimensions.get("window").width / 1.3,
              marginTop: 10,
            }}
          >
            <Button style={styles.btn}>🌟 4.5</Button>
            <Button style={styles.btn}>💯 100% Sure</Button>
            <Button style={styles.btn}>⏰ 08 - 10 Days</Button>
          </View>
          {/* End of Description */}

          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                lineHeight: 13,
                letterSpacing: 0.165,
                textAlign: "center",
                color: "#B0B3BA",
              }}
            >
              Total amount
            </Text>
            <Text
              style={{
                position: "absolute",
                top: 20,
                left: -20,
                color: theme.colors.linkColor,
                fontSize: 27,
                fontWeight: "800",
              }}
            >
              $
            </Text>
            <Text
              style={{
                fontSize: 45,
                fontWeight: "600",
                lineHeight: 53,
                letterSpacing: 0,
                textAlign: "left",
              }}
            >
              {productId.price}
            </Text>
          </View>
          <View
            style={{
              height: "100%",
              // backgroundColor:"black",
              flex: 1,
            }}
          >
            <Text
              style={{
                // fontFamily: "Roboto",
                fontSize: 18,
                fontWeight: "700",
                lineHeight: 21,
                letterSpacing: 0,
                textAlign: "left",
                justifyContent: "flex-start",
                color: "#000000",
              }}
            >
              Similar Artworks
            </Text>
            <RelatedProduct />
          </View>
          <View
            style={{
              // height: "100%",
              width: "95%",
              marginTop: 10,
              // backgroundColor:"black",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                alignContent: "center",
              }}
              onPress={() => addToCart(productId)}
            >
              <Text
                style={{
                  backgroundColor: theme.colors.linkColor,
                  // padding: 10,
                  color: "white",
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  alignContent: "center",
                  fontSize: 16,
                  fontWeight: "600",
                  lineHeight: 48,
                  letterSpacing: 0,
                  textTransform: "uppercase",
                  // paddingTop:10
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default withTheme(SingleProduct);

const styles = StyleSheet.create({
  productTitle: {
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "left",
  },
  productmeta: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 0,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "left",
  },
});
