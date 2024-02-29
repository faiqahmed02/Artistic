import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { withTheme } from "react-native-paper";
import InputComp from "../../component/mainscreen/InputComp";
import ButtonComp from "../../component/mainscreen/ButtonComp";

function Support({ theme, navigation }) {
    console.log(Platform.OS);
  return (
    <View>
      <LinearGradient
        style={{ alignItems: "center" }}
        colors={[theme.colors.myOwnColor, "transparent"]}
      >
        <View style={styles.container}>
          <InputComp placeholder={"Subject"} />
          <InputComp placeholder={"Message"} multiline={true} height={169} maxLength={150}/>
          <ButtonComp btnText={"Submit"} onPress={() => navigation.navigate("Home")} width={"100%"} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    heigh: "100%",
    width: "100%",
    alignItems: "left",
    padding: 20,
    marginTop: Platform.OS === "ios" ? 20 :"auto"
  },
});

export default withTheme(Support);
