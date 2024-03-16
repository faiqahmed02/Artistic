import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DrawerActions, useRoute } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { View } from "react-native";

function MenuBar({ navigation }, props) {
  const route = useRoute();
  // // console.log(route.name);
  return route.name !== "Home" ? (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        marginLeft: 20,
        backgroundColor: "#C1272D",
        padding: 10,
        borderRadius: 5,
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} size={25} color="#FFf" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        marginLeft: 20,
        backgroundColor: "#C1272D",
        // padding: 10,
        borderRadius: 5,
      }}
    >
      <Image
        source={require("../../assets/hammburger.png")}
        style={{ width: 45, height: 45 }}
      />
      {/* <FontAwesomeIcon icon={faBars} size={25} color="#FFf" /> */}
    </TouchableOpacity>
  );
}

export default MenuBar;
