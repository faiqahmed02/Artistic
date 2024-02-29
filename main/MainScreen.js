import { DrawerActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

function MainScreen({ theme, navigation }) {
  const nav = ["Artist", "Gallery", "Followers","Favorites","Online Classes","Events & News","Blogs" ,"Promote With Us"];
  const [homeNav, setHomeNav] = useState("Artist")
  const navChange = (d) => {
    setHomeNav(d)
  }
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      // style={styles.background}
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
          <ManNav theme={theme} nav={nav} onPress={navChange} homeNav={homeNav} />
          <Banner /> 
          {/* <TrendingArtist navigation={() => navigation.navigate("Products")} navigation2={navigation}/> */}
          <Artist title={"Trending Artist"} />
          <Artist title={"Top 100 Best Selling"} />
          <Artist title={"Artist"} />
          <Artist title={"Gallery"} />
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </LinearGradient>
  );
}

export default withTheme(MainScreen);
