import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "react-native-paper";

function EventsArchive({ theme, navigation }) {
  return (
    <View>
      <LinearGradient
        style={{ alignItems: "center" }}
        colors={[theme.colors.myOwnColor, "transparent"]}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Events and News</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: 345,
              maxWidth:"100%",
              height: 194,
              backgroundColor: "white",
              borderRadius: 10,
              marginTop:10
            }}
          >
            <View
              style={{
                width: "50%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  // Friday
                  color: "#2E2E2E",
                  fontSize: 18,
                  fontWeight: "400",
                  lineHeight: 40,
                }}
              >
                Friday
              </Text>
              <Text
                style={{
                  // 12
                  color: "#C1272D",
                  fontSize: 44,
                  fontWeight: "600",
                }}
              >
                12
              </Text>
              <Text
                style={{
                  // 05-07 PM<br/>New York, America<br/>
                  color: "#1E1E1E",
                  fontSize: 12,
                  fontWeight: "600",
                  lineHeight: 28,
                }}
              >
                September
              </Text>
              <Text
                style={{
                  // 05-07 PM<br/>New York, America<br/>
                  color: "#1E1E1E",
                  fontSize: 12,
                  fontWeight: "600",
                  lineHeight: 28,
                }}
              >
                <FontAwesomeIcon
                  icon={faClock}
                  color={theme.colors.linkColor}
                />{" "}
                5:00 PM
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Events Details")}>
                <Text
                  style={{
                    color: "#1E1E1E",
                    fontSize: 12,
                    fontWeight: "600",
                    lineHeight: 28,
                  }}
                >
                  View
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                position:"relative",
                overflow:"hidden"
              }}
            >
                <ImageBackground source={require("../../assets/event_img.png")} style={{position:"absolute", width:"100%", height:"100%", borderRadius:10}} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "left",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "left",
  },
});
export default withTheme(EventsArchive);
