import { DrawerActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Banner from "../../component/mainscreen/Banner";
import TrendingArtist from "../../component/mainscreen/TrendingArtist";
import Artist from "../../component/mainscreen/Artist";
import Footer from "../../component/footer/Footer";
import { ScrollView } from "react-native";
import { getUser } from "../../firestoreFunctions/User";
import { auth } from "../../firebaseConfig";
import ManNav from "../../component/mainscreen/ManNav";
import { useSelector } from "react-redux";
import Stats from "../../component/mainscreen/Stats";
import ClassesCard from "../../component/mainscreen/ClassesCard";
import EventsCard from "../../component/mainscreen/EventsCard";
import ProductCard from "../../component/mainscreen/ProductCard";

function ViewArtist({ theme, navigation, route }) {
  const { artistId } = route.params;
  const [artist, setArtist] = useState({});

  const [initials, setInitials] = useState("");
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
    setHomeNav(d);
  };
  console.log(artistId.photoURL);
  const [currentUser, setCurrentUser] = useState("");
  const state = useSelector((state) => state.userType);
  // console.log(state.userRole);

  const role = () => {
    state ? state.userRole : "";
  };
  useEffect(() => {
    const nameArray = artistId.fullName.split(" ");
    const firstNameIn = nameArray[0].charAt(0).toUpperCase();
    const lastNameIn = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    setInitials(firstNameIn + lastNameIn);
    return () => {};
  }, [currentUser, artistId]);
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
            justifyContent: "center",
            // backgroundColor: theme.colors.myOwnColor,
            height: "100%",
            paddingBottom: 100,
            paddingTop: 30,
            alignItems: "center",
          }}
        >
          {/* {artistId.photoUrl ? <UserAvatar image={artistId.photoUrl} /> : <UserAvatar  text="AL" />} */}
          {artistId.photoURL ? (
            // <Avatar.Image source={{ uri: artistId.photoURL }} size={100} />
            <Image
              source={{ uri: artistId.photoURL }}
              style={{ width: 343, height: 242, borderRadius: 5 }}
            />
          ) : (
            // <Avatar.Text label={initials} size={100} />
            <Image
              source={require("../../assets/artistprofle.png")}
              style={{ width: 343, height: 242, borderRadius: 5 }}
            />
          )}
          <View
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              width: 343,
              marginVertical: 5,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", textAlign: "left" }}
            >
              Artist Biography:
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "normal", textAlign: "left" }}
            >
              Lorem Ipsum
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-start",
              alignContent: "flex-start",
              width: 343,
              marginVertical: 5,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", textAlign: "left" }}
            >
              Artist Statement:
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "normal", textAlign: "left" }}
            >
              Lorem Ipsum
            </Text>
          </View>
          <View style={styles.product_flex}>
            <ProductCard
              horizontal={"false"}
              style={{ flexDirection: "row" }}
              _style={styles.product_flex}
              _id={artistId.id}
            />
          </View>
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </LinearGradient>
  );
}

export default withTheme(ViewArtist);

const styles = StyleSheet.create({
  product_flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    // width:"100%"
  },
});
