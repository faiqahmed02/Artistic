import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Avatar, withTheme } from "react-native-paper";
import { getAllurers } from "../../firestoreFunctions/User";
import { useNavigation } from "@react-navigation/native";
import ArtistCard from "./ArtistCard";

function Artist({ theme, title, aritistSelected }) {
  const [artist, setArtist] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getAllurers().then((res) => {
      const artistData = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArtist(artistData);
    });
  }, []);
  // console.log(artist);

  const viewArtist = (d) => {
    // console.log(d);
    navigation.navigate("View Artist", {
      artistId: d,
    });
  };

  return (
    <View style={styles.trendingArtist}>
      <View
        style={{
          //   flex: 1,
          width: Dimensions.get("window").width,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.trendText}>{title}</Text>
        <Text
          style={{
            marginRight: 20,
            color: theme.colors.linkColor,
            fontSize: 13,
            lineHeight: 17.7,
            fontWeight: "600",
            marginTop: 15,
            marginHorizontal: 10,
            textDecorationLine: "underline",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("All Artist")}>
            <Image
              source={require("../../assets/forward.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </Text>
      </View>
      <ScrollView horizontal style={{ maxHeight: 190 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            // height: 190,
          }}
        >
          <ScrollView horizontal style={{ maxHeight: 190 }}>
            <ArtistCard />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

export default withTheme(Artist);

const styles = StyleSheet.create({
  trendingArtist: {
    flex: 1,
    padding: 10,
    width: Dimensions.get("window").width,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  trendText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 40,
    // height:100,
  },
  //   Product
  productCard: {
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  productImg: {
    width: 100,
    height: 97,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
});
