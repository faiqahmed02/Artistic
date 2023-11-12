import React from "react";
import { Dimensions } from "react-native";
import { View } from "react-native";

function Footer() {
  return (
    <View
      style={{
        position: "absolute",
        top: 600,
        width: Dimensions.get("window").width,
        height:80,
        backgroundColor:"white",
        borderRadius:10
      }}
    ></View>
  );
}

export default Footer;
