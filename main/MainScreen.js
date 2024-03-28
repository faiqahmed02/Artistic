import { DrawerActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Banner from "../component/mainscreen/Banner";
import TrendingArtist from "../component/mainscreen/TrendingArtist";
import Artist from "../component/mainscreen/Artist";
import Footer from "../component/footer/Footer";
import { ScrollView } from "react-native";
import { getUser } from "../firestoreFunctions/User";
import { auth } from "../firebaseConfig";
import ManNav from "../component/mainscreen/ManNav";
import { useSelector } from "react-redux";
import Stats from "../component/mainscreen/Stats";
import ClassesCard from "../component/mainscreen/ClassesCard";
import EventsCard from "../component/mainscreen/EventsCard";
import ButtonComp from "../component/mainscreen/ButtonComp";
import { addOrder, openURL } from "../firestoreFunctions/Main";
import Follower from "../component/mainscreen/Follower";

function MainScreen({ theme, navigation }) {
  const nav = [
    "Artist",
    "Gallery",
    "Followers",
    "Favorites",
    "Online Classes",
    "Events & News",
    "Blogs",
    "Promote With Us",
  ];
  const [homeNav, setHomeNav] = useState("Artist");
  const navChange = (d) => {
    if (d === "Blogs") {
      openURL("https://zicoart.com/blogs/");
    } else if (d === "Promote With Us") {
      openURL("https://zicoart.com/promote-your-art/");
    } else {
      setHomeNav(d);
    }
  };
  const [currentUser, setCurrentUser] = useState("");
  const state = useSelector((state) => state.userType);
  // console.log(state.userRole);

  const role = () => {
    state ? state.userRole : "";
  };
  useEffect(() => {
    // checkUser();
  }, [currentUser]);
  // const checkUser = async () => {
  //   const user = await auth.currentUser;
  //   if (user.emailVerified) {
  //     alert("your Email is verified");
  //   } else {
  //     // alert("Please Verify your Account")
  //     Alert.alert("Account Verification", "Please Verify Your account", [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "Send Verification Email",
  //         onPress: () => console.log("OK Pressed"),
  //       },
  //     ]);
  //   }
  // };

  setInterval(() => {
    if (state) {
      setCurrentUser(state.userRole);
    } else {
      setCurrentUser("");
    }
  }, 1000);

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View
          style={{
            // flex: 1,
            alignContent: "center",
            // backgroundColor: theme.colors.myOwnColor,
            height: "100%",
            paddingBottom: 100,
          }}
        >
          {currentUser === "Artist" ? <Stats /> : ""}
          {/* <ButtonComp btnText="Add order" onPress={() => add()} /> */}
          <ManNav
            theme={theme}
            nav={nav}
            onPress={navChange}
            homeNav={homeNav}
          />
          <Banner />
          {homeNav === "Artist" ? (
            <>
              <Artist title={"Trending Artist"} />
              <Artist title={"Top 100 Best Selling"} />
              <Artist title={"Artist"} />
              <Artist title={"Gallery"} />
            </>
          ) : homeNav === "Gallery" ? (
            <TrendingArtist
              navigation={() => navigation.navigate("Products")}
              navigation2={navigation}
            />
          ) : homeNav === "Online Classes" ? (
            <View style={{ alignItems: "center" }}>
              <ClassesCard />
            </View>
          ) : homeNav === "Events & News" ? (
            <View style={{ alignItems: "center" }}>
              <EventsCard theme={theme} />
            </View>
          ) : homeNav === "Followers" ? (
            <View style={{ alignItems: "center" }}>
              <ScrollView
                horizontal
                // style={{ maxHeight: 190 }}
              >
                <Follower theme={theme} />
              </ScrollView>
            </View>
          ) : homeNav === "Favorites" ? (
            <TrendingArtist
              navigation={() => navigation.navigate("Products")}
              navigation2={navigation}
              catname="Favorites"
            />
          ) : (
            ""
          )}
          {/* <TrendingArtist navigation={() => navigation.navigate("Products")} navigation2={navigation}/> */}
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </LinearGradient>
  );
}

export default withTheme(MainScreen);
