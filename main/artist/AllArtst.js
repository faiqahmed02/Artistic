import React from "react";
import { withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";
import ArtistCard from "../../component/mainscreen/ArtistCard";

function AllArtst({ theme }) {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
            flexWrap: "wrap",
            paddingTop:40
            // height: 190,
          }}
        >
          <ArtistCard />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default withTheme(AllArtst);
