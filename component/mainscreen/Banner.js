import React, { useState, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View, SafeAreaView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import img1 from "../../assets/ban_1.png";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function Banner() {
  const width = Dimensions.get("window").width;
  const imgArr = [img1, img1, img1, img1, img1, img1, img1, img1];
  const navigation = useNavigation();
  return (
    <View style={{ textAlign: "center", alignItems: "center" }}>
      <Carousel
        loop
        width={width / 2}
        height={width / 2}
        autoPlay={true}
        data={imgArr}
        autoFillData
        mode="parallax"
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => // console.log("current index:", index)}
        // pagingEnabled
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              // borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Text style={{ textAlign: "center", fontSize: 30 }}>{item}</Text> */}
            <TouchableOpacity onPress={() => navigation.navigate("Showrooms")}>
              <Image
                source={item}
                style={{
                  width: 200,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.bannerText}>
        ZicoArt is a Digital Gallery Where Artists Can Showcase & Sell Artworks
        While Connecting with Art-Lovers Globally.
      </Text>
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  bannerText: {
    fontSize: 16,
    lineHeight: 27,
    textAlign: "center",
    width: 350,
  },
});
