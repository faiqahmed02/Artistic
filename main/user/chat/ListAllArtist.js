import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getAllurers } from "../../../firestoreFunctions/User";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";

function ListAllArtist({ theme }) {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    getAllurers().then((res) => {
      const artistData = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setArtist(artistData);
    });
  }, []);

  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <View>
        {artist.map((d) => {
          return <Text> {d.fullName}</Text>;
        })}
      </View>
    </LinearGradient>
  );
}

export default withTheme(ListAllArtist) ;
