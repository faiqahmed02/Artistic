import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image } from "react-native";
import { Text, View } from "react-native";
import { withTheme } from "react-native-paper";
import ButtonComp from "../../component/mainscreen/ButtonComp";

function Thankyou({ theme, navigation }) {
  return (
    <LinearGradient
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <View>
        <Image source={require("../../assets/ty.png")} />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 18,
            lineHeight: 24,
            width: 321,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Thank you for your order. An email with your Order information will be
          sent shortly.
        </Text>
        <View style={{ marginTop: 20 }}>
          <ButtonComp
            btnText="GO BACK TO HOMEPAGE"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export default withTheme(Thankyou);
