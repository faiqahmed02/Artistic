import { DrawerActions } from "@react-navigation/native";
import React from "react";
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

function MainScreen({ theme, navigation }) {
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
            // paddingBottom: 100,
          }}
        >
          <Banner />
          <TrendingArtist navigation={navigation} />
          <Artist />
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </LinearGradient>
  );
}

export default withTheme(MainScreen);
