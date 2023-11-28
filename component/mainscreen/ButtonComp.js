import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

function ButtonComp(props) {
  return (
    <Button style={styles.btn} textColor="white" onPress={props.onPress} >
      {props.btnText}
    </Button>
  );
}

export default ButtonComp;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#C1272D",
    width: 345,
    height: 50,
    borderRadius: 0,
    justifyContent: "center",
    margin: "auto",
    color: "white",
    textTransform:"uppercase",
    fontSize:26,
    // fontSize: 26,
  },
});
