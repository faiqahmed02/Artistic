import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

function InputComp(props) {
  return (
    <TextInput
      placeholder={props.placeholder}
      label={props.placeholder}
      value={props.text}
      onChangeText={props.onChangeText}
      style={styles.shadow}
      secureTextEntry={props.secureTextEntry}
      right={props.right === true ? <TextInput.Icon name="eye" /> : false}
    />
  );
}

export default InputComp;

const styles = StyleSheet.create({
  shadow: {
    borderColor: "none", // if you need
    //   borderWidth:1,
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
    marginBottom: 10,
    backgroundColor: "white",
  },
});
