import React from "react";
import { Dimensions, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { auth } from "../../firebaseConfig";
import { getUser } from "../../firestoreFunctions/User";

function HeaderTitle({ navigation }) {
  // console.log(Dimensions.get("window").width);
  const user = useSelector((state) => state.user);

  return (
    <View>
      <Text style={styles.nameTitle}>
        {" "}
        {user ? (
          "Hi " + auth.currentUser ?  user.displayName : ""
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.nameTitle}>Login</Text>
          </TouchableOpacity>
        )}
      </Text>
      {user ? <Text>Welcome Back</Text> : ""}
    </View>
  );
}

export default HeaderTitle;

const styles = StyleSheet.create({
  nameTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
