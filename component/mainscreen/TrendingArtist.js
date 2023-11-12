import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "react-native-paper";
import ProductCard from "./ProductCard";

function TrendingArtist({ theme }) {
  console.log(Dimensions.get("window").width);
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
        <Text style={styles.trendText}>Trending Artists</Text>
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
      <ProductCard />
    </View>
  );
}

export default withTheme(TrendingArtist);

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
  }
});
