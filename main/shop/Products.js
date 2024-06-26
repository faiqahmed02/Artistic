import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import Footer from "../../component/footer/Footer";
import TrendingArtist from "../../component/mainscreen/TrendingArtist";
import { LinearGradient } from "expo-linear-gradient";
import { Chip, withTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

function Products({ theme, navigation }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      // style={styles.background}
      //   end={{ x: 1, y: 1 }}
      style={{
        // position: "absolute",
        top: 0,
        height: "100%",
        paddingBottom: 100,
      }}
    >
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          <ScrollView horizontal>
            <Chip
              icon="check"
              // rippleColor={'#C1272D'}
              showSelectedCheck={true}
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#29ABE2",
                color: "white",
                marginHorizontal: 5,
              }}
              textStyle={{ color: "white" }}
            >
              Trending Artist
            </Chip>
            <Chip
              icon="close"
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#29ABE2",
                color: "white",
                marginHorizontal: 5,
              }}
              textStyle={{ color: "white" }}
            >
              Trending Art
            </Chip>
            <Chip
              icon="close"
              onPress={() => console.log("Pressed")}
              style={{
                backgroundColor: "#29ABE2",
                color: "white",
                marginHorizontal: 5,
              }}
              textStyle={{ color: "white" }}
            >
              Top 1000
            </Chip>
          </ScrollView>
        </View>
        <TrendingArtist
          navigation={navigation.navigate("Products")}
          catname="New York Arts Gallery"
        />
        <TrendingArtist
          navigation={navigation.navigate("Products")}
          catname="Vanity Art Gallery"
        />
        <TrendingArtist
          navigation={navigation.navigate("Products")}
          catname="Artist-Run Gallery"
        />
        <TrendingArtist
          navigation={navigation.navigate("Products")}
          catname="Exhibition Arts Gallery"
        />
      </ScrollView>
      <Footer navigation={navigation} />
    </LinearGradient>
  );
}

export default withTheme(Products);
