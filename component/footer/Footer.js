import {
  faBagShopping,
  faBell,
  faHome,
  faThLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { auth } from "../../firebaseConfig";

function Footer({ theme, navigation }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: Dimensions.get("window").width,
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(!auth.currentUser ? "Login" : "Profile")
        }
      >
        <Image
          source={require("../../assets/profile.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        {/* <FontAwesomeIcon
          icon={faBagShopping}
          color={theme.colors.linkColor}
          size={25}
        /> */}
        <Image
          source={require("../../assets/cart.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../../assets/home.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <Image
          source={require("../../assets/notification.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Image
          source={require("../../assets/chat.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default withTheme(Footer);
