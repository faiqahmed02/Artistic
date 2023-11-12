import React, { useState, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View, SafeAreaView } from "react-native";
import Carousel from "react-native-reanimated-carousel";

function Banner() {
  const width = Dimensions.get("window").width;
  return (
    <View style={{textAlign: "center", alignItems: "center", }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        mode="parallax"
        pagingEnabled
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
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
    width:350,

  },
});
