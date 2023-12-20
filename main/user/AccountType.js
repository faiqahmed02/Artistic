import React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signUpReducer } from "../../store/rootSlice";
import { useState } from "react";

function AccountType({ theme, navigation }) {
  const [role, setRole] = useState({
    user_role: "",
  });
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch("Buyer");
  const state = useSelector((state) => state.signupState);
  const typeSelected = (t) => {
    setRole({ ...role, user_role: t });
    setClicked(true);
    // console.log(role);
  };

  const signUpScreen = () => {
    dispatch(signUpReducer(role));
    navigation.navigate("Signup");
  };

  React.useEffect(() => {
    if (clicked === true) {
      signUpScreen();
    }
  }, [role]);
  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <View style={styles.accType}>
        <Text style={styles.text}>Create Account as a</Text>
        <View>
          <TouchableOpacity onPress={() => typeSelected("Artist")}>
            <Text style={styles.link}>· Artist</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => typeSelected("Buyer")}>
            <Text style={styles.link}>· Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => typeSelected("Business")}>
            <Text style={styles.link}>· Business</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

export default withTheme(AccountType);

const styles = StyleSheet.create({
  accType: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    padding: 20,
  },
  text: {
    color: "#1B1B1B",
    fontSize: 24,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  link: {
    // width: "100%",
    // height: "100%",
    color: "#29ABE2",
    fontSize: 16,
    fontWeight: "600",
    // textDecoration: "underline",
    textTransform: "uppercase",
    lineHeight: 40,
  },
});
