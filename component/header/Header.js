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
import { useDispatch, useSelector } from "react-redux";
import { logOut, removeUserTypeReducer } from "../../store/rootSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
// import { businessNav, buyerNav } from "./nav";

function Header({ theme, navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const user_type = useSelector((state) => state.userType);
  console.log(user_type);
  const businessNav = [
    {
      icon: require("../../assets/box.png"),
      name: "Home",
    },
    {
      icon: require("../../assets/box.png"),
      name: "My Products",
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
      name: "Create Event",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Shipments",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Classes",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Create Classes",
    },
    {
      icon: require("../../assets/box.png"),
      name: "Order Selling",
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
      name: auth.currentUser ? "Logout" : "Login",
    },
  ];
  
  
  const buyerNav = [
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
        name: "Subscriptions",
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
        name: auth.currentUser ? "Logout" : "Login",
      },
    ];
  const nav = user_type && user_type.role === "Business" ? businessNav : buyerNav;
  const headerAction = (d) => {
    // console.log(d);
    if (d === "Logout" && auth.currentUser) {
      signOut(auth)
        .then((res) => {
          dispatch(logOut());
          dispatch(removeUserTypeReducer());
        })
        .catch((err) => {
          alert("no one is logged in");
        });
    } else {
      navigation.navigate(d);
    }
    navigation.closeDrawer();
  };
  console.log(user);
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
         {auth.currentUser && <Image 
            source={{uri:auth.currentUser.photoURL}}
            style={{
              // width:"40%",
              // height:"auto"
              marginLeft: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
          />}
          <Text style={styles.d_text}>Discover the Art Of Possinility</Text>
          <Avatar.Image
            size={93}
            source={require("../../assets/profile_picture.png")}
            style={{
              marginTop: 10,
              marginLeft: 10,
            }}
          />
          <Text style={styles.d_user}>{auth.currentUser ? auth.currentUser.displayName : ""}</Text>
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
    paddingLeft: 10,
  },
  d_user: {
    // Max John
    color: "#0A0A0A",
    paddingLeft: 10,
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
    paddingLeft: 10,
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



