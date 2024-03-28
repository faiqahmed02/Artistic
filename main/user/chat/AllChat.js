import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
// import { useFirestore } from 'reactfire';
import { auth, db } from "../../../firebaseConfig";
import { Avatar, withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../../../firestoreFunctions/User";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatListScreen = ({ theme }) => {
  // const firestore = useFirestore();
  const [chatRooms, setChatRooms] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.name);
  useEffect(() => {
    // Get the user ID (replace '123' with your actual user ID retrieval logic)
    getUser(auth.currentUser.uid).then((res) => {
      // console.log(res);
    });
    const userId = auth.currentUser.uid;

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatRoomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        members: doc.data().members,
      }));
      setChatRooms(chatRoomsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const navigateToChat = (chatRoomId) => {
    // Navigate to the ChatScreen with the selected chat room ID
    const ids = chatRoomId.split("-");
    // console.log(ids);
    const userId = ids[0];
    const artistId = ids[1];
    // console.log(userId + " " + artistId);
    navigation.navigate("Chat Room", { chatRoomId });
  };

  return (
    <LinearGradient
      style={{ padding: 10, flex: 1 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      {/* <ScrollView> */}
      <View>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          {route.name === "Notification" ? "Notifications" : "Your Chat Rooms"}
        </Text>
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigateToChat(item.id)}
              style={{ flexDirection: "row", marginVertical: 10 }}
            >
              <Avatar.Image
                size={50}
                source={require("../../../assets/avatart.png")}
              />
              <View style={{ margin: "auto", paddingLeft: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {auth.currentUser.displayName}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  New Message
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* </ScrollView> */}
      <TouchableOpacity
        style={{ position: "absolute", bottom: 20, right: 20 }}
        onPress={() => navigation.navigate("New Chat")}
      >
        <FontAwesomeIcon
          icon={faPlusCircle}
          size={60}
          color={theme.colors.linkColor}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default withTheme(ChatListScreen);
