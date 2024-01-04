import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { withTheme } from "react-native-paper";

function Polices({ theme }) {
  return (
    <View>
      <LinearGradient
        style={{ alignItems: "center" }}
        colors={[theme.colors.myOwnColor, "transparent"]}
      >
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/polices.png")}
              style={{
                width: 269,
                height: 197,
              }}
            />
            <Text
              style={{
                color: "#000",
                fontSize: 14,
                fontWeight: "400",
                textTransform: "capitalize",
                lineHeight: 20,
                marginTop:10
              }}
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              nec scelerisque mauris, quis maximus lorem. Pellentesque vitae
              magna sodales mauris sollicitudin pulvinar et id nisi. Praesent
              vitae dui id tellus porttitor rutrum. Etiam consectetur efficitur
              turpis non hendrerit. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Nulla dui
              nisi, dictum sed malesuada consectetur, egestas in metus. Nam a
              dictum sem.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Donec nec scelerisque mauris, quis maximus lorem.
              Pellentesque vitae magna sodales mauris sollicitudin pulvinar et
              id nisi. Praesent vitae dui id{" "}
            </Text>
          </View>
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
  },
});

export default withTheme(Polices);
