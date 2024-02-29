import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import InputComp from "../mainscreen/InputComp";

function ChatInput() {
  return (
    <View>
      <TouchableOpacity>
        <Image source={require("../../assets/camer_chate.png")} />
      </TouchableOpacity>
      <InputComp placeholder="Enter Message" />
      ChatInput
    </View>
  );
}

export default ChatInput;
