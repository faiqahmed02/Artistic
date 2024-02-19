import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

function ButtonComp(props) {
  const styles = StyleSheet.create({
    btn: {
      backgroundColor: "#C1272D",
      width: props.width ? props.width : 345,
      maxWidth:"100%",
      height: 50,
      borderRadius: 0,
      justifyContent: "center",
      margin: "auto",
      color: "white",
      textTransform: "uppercase",
      fontSize: 26,
      // fontSize: 26,
    },
  });
  return (
    <Button style={styles.btn} textColor="white" onPress={props.onPress} disabled={props.disabled}>
      {props.btnText}
    </Button>
  );
}

export default ButtonComp;
