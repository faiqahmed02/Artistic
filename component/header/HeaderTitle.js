import React from "react";
import { Dimensions, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";

function HeaderTitle() {
  console.log(Dimensions.get("window").width);
  return (
    <View>
      <Text style={styles.nameTitle}>Hi! John</Text>
      <Text>Welcome Back</Text>
    </View>
  );
}

export default HeaderTitle;

const styles = StyleSheet.create({
  nameTitle: {
    fontSize:20,
    fontWeight: "bold"
  },
});
