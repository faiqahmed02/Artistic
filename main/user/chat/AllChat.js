import React, { useState } from "react";
import { Text, View } from "react-native";
import { getAllChats } from "../../../firestoreFunctions/User";
import { auth } from "../../../firebaseConfig";

function AllChat() {
  const [messages, setMessages] = useState();
  React.useEffect(() => {
    getAllChats().then((res) => {
      console.log(res);
    })
  }, []);

  return (
    <View>
      <Text>AllChat</Text>
    </View>
  );
}

export default AllChat;
