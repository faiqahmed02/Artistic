import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Text, View } from "react-native";
import { getAllurers } from "../../../firestoreFunctions/User";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import ButtonComp from "../../../component/mainscreen/ButtonComp";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../../../firebaseConfig";

function ListAllArtist({ theme, navigation }) {
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
  // console.log(artist[0]?.id);
  const handleChatPress = (artistId, artistName) => {
    userId = auth.currentUser.uid;
    navigation.navigate("Chat Screen", { artistId, userId, artistName });
  };
  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]} style={{flex:1}}>
      <View>
        <FlatList
          data={artist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChatPress(item.id, item.fullName)}
            >
              <View style={{ flexDirection: "row", margin: "auto" }}>
                <Image
                  source={require("../../../assets/avatart.png")}
                  style={{ width: 50, height: 57, borderRadius: 59 }}
                />
                <Text style={{ margin: "auto" }}>{item.id}</Text>
                {/* <ButtonComp
                btnText="Start Chat"

              /> */}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}

export default withTheme(ListAllArtist);
