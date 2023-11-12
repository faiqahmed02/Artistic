import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";

function MenuBar({ navigation }, props) {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        marginLeft: 20,
        backgroundColor: "#C1272D",
        padding: 10,
        borderRadius: 5,
      }}
    >
      <FontAwesomeIcon icon={faBars} size={25} color="#FFf" />
    </TouchableOpacity>
  );
}

export default MenuBar;
