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

function ArtistCard() {
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

  return artist.map((d, i) => {
    const nameArray = d.fullName.split(" ");
    const firstNameIn = nameArray[0].charAt(0).toUpperCase();
    const lastNameIn = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
    const n = firstNameIn + lastNameIn;

    // return initials;
    return (
      <TouchableOpacity key={i} onPress={() => viewArtist(d)}>
        <View style={styles.productCard}>
          {d.photoURL ? (
            <Image
              style={styles.productImg}
              source={
                d.photoURL
                  ? { uri: d.photoURL }
                  : require("../../assets/product_img_1.png")
              }
            />
          ) : (
            <Avatar.Text label={n} size={100} />
          )}

          <Text style={styles.productTitle}>{d.fullName}</Text>
        </View>
      </TouchableOpacity>
    );
  });
}

export default withTheme(ArtistCard);

const styles = StyleSheet.create({
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
    width:100,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
});
