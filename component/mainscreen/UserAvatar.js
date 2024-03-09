import React from "react";
import { Avatar } from "react-native-paper";

function UserAvatar(image, text) {
    console.log(image.text);
  return image ? (
    <Avatar.Image source={{ uri: image }} size={100} />
  ) : (
    <Avatar.Text label={text} size={100} />
  );
}

export default UserAvatar;
