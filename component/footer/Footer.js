import {
  faBagShopping,
  faBell,
  faHome,
  faThLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { withTheme } from "react-native-paper";

function Footer({ theme, navigation }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: "3%",
        width: Dimensions.get("window").width,
        height: 70,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Products")}>
        <FontAwesomeIcon
          icon={faThLarge}
          color={theme.colors.linkColor}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <FontAwesomeIcon
          icon={faBagShopping}
          color={theme.colors.linkColor}
          size={22}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesomeIcon
          icon={faHome}
          color={theme.colors.linkColor}
          size={22}
        />
      </TouchableOpacity>
      <FontAwesomeIcon icon={faBell} color={theme.colors.linkColor} size={22} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <FontAwesomeIcon icon={faUser} color={theme.colors.linkColor} size={22} />
      </TouchableOpacity>
    </View>
  );
}

export default withTheme(Footer);
