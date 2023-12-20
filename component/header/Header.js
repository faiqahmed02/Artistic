import React, { useState } from "react";
import {
  Dimensions,
  Image,
  // ImageBackground,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faClose,
  faCross,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/rootSlice";

const nav = [
  {
    icon: require("../../assets/box.png"),
    name: "Home",
  },
  {
    icon: require("../../assets/box.png"),
    name: "My Orders",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Events",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Classes",
  },
  {
    icon: require("../../assets/box.png"),
    name: "About Us",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Technical Support",
  },
  {
    icon: require("../../assets/box.png"),
    name: "ZicoArt Policies & Requirements",
  },
  {
    icon: require("../../assets/box.png"),
    name: "ZicoArt Terms & Conditions",
  },
  {
    icon: require("../../assets/box.png"),
    name: "Logout",
  },
];

function Header({ theme, navigation }) {
  const dispatch = useDispatch();

  const headerAction = (d) => {
    console.log(d);
    if (d === "Logout") {
      dispatch(logOut());
    }
    navigation.closeDrawer();
  };
  return (
    <LinearGradient
      style={{ alignItems: "left" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <SafeAreaView
        style={{
          height: "100%",
          // margin: 20,
          paddingLeft: 20,
          paddingTop: 20,
          paddingBottom: 20,
          width: Dimensions.get("window").width,
          overflow: "hidden",
          // backgroundColor:"black"
        }}
      >
        <ScrollView>
          <ImageBackground
            source={require("../../assets/drawer_bg_image.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.closeDrawer()}
            style={{
              marginLeft: 10,
              marginTop: 10,
              backgroundColor: "#C1272D",
              padding: 10,
              borderRadius: 5,
              width: 46,
            }}
          >
            <FontAwesomeIcon icon={faClose} size={25} color="#FFf" />
          </TouchableOpacity>
          <Image
            source={require("../../assets/d_logo.png")}
            style={{
              // width:"40%",
              // height:"auto"
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Text style={styles.d_text}>Discover the Art Of Possinility</Text>
          <Avatar.Image
            size={93}
            source={require("../../assets/profile_picture.png")}
            style={{
              marginTop: 10,
            }}
          />
          <Text style={styles.d_user}>Max John</Text>
          {nav.map((d, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.navcomp}
                onPress={() => headerAction(d.name)}
              >
                <Image source={d.icon} />
                <Text style={styles.navtext}>{d.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default withTheme(Header);

const styles = StyleSheet.create({
  d_text: {
    // Discover the Art Of Possibility
    color: "#2E2E2E",
    fontSize: 20,
    // fontFamily: "Libre Baskerville",
    fontWeight: "400",
    width: 168,
    lineHeight: 30,
    // wordWrap: "break-word",
  },
  d_user: {
    // Max John
    color: "#0A0A0A",
    fontSize: 20,
    // fontFamily: 'Roboto';
    fontWeight: "600",
    // wordWrap: 'break-word'
  },
  image: {
    position: "absolute",
    justifyContent: "flex-end",
    width: "100%",
    height: 620,
    // left: 80,
    right: -100,
    top: 100,
  },
  navcomp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  navtext: {
    // Home
    color: "#142845",
    fontSize: 17,
    // fontFamily: 'Qanelas';
    fontWeight: "500",
    textTransform: "capitalize",
    lineHeight: 20,
  },
});
