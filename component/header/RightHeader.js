import {
  faComment,
  faCommentDots,
  faMessage,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function RightHeader({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        width: 110,
        flexDirection: "row",
        justifyContent: "space-around",
        margin: "auto",
      }}
    >
      {/* <View style={{ marginRight: 20 }}> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={{
          // marginLeft: 20,
          backgroundColor: "#C1272D",
          // padding: 10,
          borderRadius: 5,
          // marginRight: 20,
          // marginTop:10,
          overflow:"hidden"
          // width: 50,
        }}
      >
        {/* <FontAwesomeIcon icon={ */}
        <Image source={require("../../assets/topChat.png")} style={{width:45, height:45}} />
        {/* // size={25} color="#FFf" /> */}
      </TouchableOpacity>
      {/* </View> */}
      {/* <View style={{ marginRight: 20 }}> */}
      {/* <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{
          // marginLeft: 20,
          backgroundColor: "#C1272D",
          padding: 10,
          borderRadius: 5,
          marginRight: 20,
          // marginTop:10
          // width: 50,
        }}
      >
        <FontAwesomeIcon icon={faSearch} size={25} color="#FFf" />
      </TouchableOpacity> */}
      {/* </View> */}
    </View>
  );
}

export default RightHeader;
