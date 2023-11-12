import React from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";

function ProductCard() {
  return (
    <ScrollView horizontal style={{ maxHeight: 190 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
          height: 190,
        }}
      >
        <View style={styles.productCard}>
          <Image
            style={styles.productImg}
            source={require("../../assets/product_img_1.png")}
          />
          <Text style={styles.productTitle}>Product Title</Text>
          <Text style={styles.productPrice}>$78.00</Text>
          <TouchableOpacity>
            <Text style={styles.productBtn}>Add To cart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productCard}>
          <Image
            style={styles.productImg}
            source={require("../../assets/product_img_1.png")}
          />
          <Text style={styles.productTitle}>Product Title</Text>
          <Text style={styles.productPrice}>$78.00</Text>
          <TouchableOpacity>
            <Text style={styles.productBtn}>Add To cart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productCard}>
          <Image
            style={styles.productImg}
            source={require("../../assets/product_img_1.png")}
          />
          <Text style={styles.productTitle}>Product Title</Text>
          <Text style={styles.productPrice}>$78.00</Text>
          <TouchableOpacity>
            <Text style={styles.productBtn}>Add To cart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productCard}>
          <Image
            style={styles.productImg}
            source={require("../../assets/product_img_1.png")}
          />
          <Text style={styles.productTitle}>Product Title</Text>
          <Text style={styles.productPrice}>$78.00</Text>
          <TouchableOpacity>
            <Text style={styles.productBtn}>Add To cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  //   Product
  productCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  productImg: {
    width: 128,
    height: 97,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
  productPrice: {
    color: "#29ABE2",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
  },
  productBtn: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
  },
});
