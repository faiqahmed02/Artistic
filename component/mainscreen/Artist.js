import React from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { withTheme } from "react-native-paper";

function Artist({ theme }) {
  return (
    <View style={styles.trendingArtist}>
      <View
        style={{
          //   flex: 1,
          width: Dimensions.get("window").width,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.trendText}>Artists</Text>
        <Text
          style={{
            marginRight: 20,
            color: theme.colors.linkColor,
            fontSize: 13,
            lineHeight: 17.7,
            fontWeight: "600",
            marginTop: 15,
            textDecorationLine: "underline",
          }}
        >
          View All
        </Text>
      </View>
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
          </View>
          <View style={styles.productCard}>
            <Image
              style={styles.productImg}
              source={require("../../assets/product_img_1.png")}
            />
            <Text style={styles.productTitle}>Product Title</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              style={styles.productImg}
              source={require("../../assets/product_img_1.png")}
            />
            <Text style={styles.productTitle}>Product Title</Text>
          </View>
          <View style={styles.productCard}>
            <Image
              style={styles.productImg}
              source={require("../../assets/product_img_1.png")}
            />
            <Text style={styles.productTitle}>Product Title</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default withTheme(Artist);

const styles = StyleSheet.create({
  trendingArtist: {
    flex: 1,
    padding: 10,
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  trendText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 40,
    width: Dimensions.get("window").width / 2,
    // height:100,
  },
  //   Product
  productCard: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  productImg: {
    width: 100,
    height: 97,
    borderRadius: 50,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
});
