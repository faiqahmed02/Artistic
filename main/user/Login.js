import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { Button, Checkbox, withTheme } from "react-native-paper";
import InputComp from "../../component/mainscreen/InputComp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logIn, logOut, userCredentialse } from "../../store/rootSlice";

function Login({ theme, navigation }) {
  const [loginForm, setLoginForm] = useState({});
  const [checked, setChecked] = useState("unchecked");
  const dispatch = useDispatch();
  const routes = navigation.getState()?.routes;

  console.log(routes);
  const handleStaySignIn = () => {
    if (checked !== "checked") {
      if (loginForm.userName) {
        setChecked("checked");
        dispatch(userCredentialse(loginForm));
      }
    } else {
      setChecked("unchecked");
    }
  };

  const handleLogin = () => {
    // console.log(loginForm);
    if (loginForm.userName) {
      dispatch(logIn(loginForm));
      setTimeout(() => {
        navigation.navigate("Checkout");
      }, 2000);
    } else {
      alert("Please Add user Name or Password");
    }
  };

  return (
    <LinearGradient
      style={{ alignItems: "center", padding: 10 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <View>
        <Image source={require("../../assets/logo.png")} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 13.5,
            lineHeight: 44,
            fontWeight: "400",
          }}
        >
          Discover the Art Of Possibility
        </Text>
      </View>
      <View
        style={{
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "600",
            fontSize: 18,
            lineHeight: 26,
            width: 197,
          }}
        >
          Welcome To The Vibrant World of Arts.
        </Text>
        <View
          style={{
            marginTop: 15,
          }}
        >
          <InputComp
            placeholder="User Name"
            secureTextEntry={false}
            // text="Michal"
            onChangeText={(username) =>
              setLoginForm({
                ...loginForm,
                userName: username,
              })
            }
          />
          <InputComp
            placeholder="Passward"
            secureTextEntry={true}
            right={true}
            // text="xyz123!"
            onChangeText={(pass) =>
              setLoginForm({
                ...loginForm,
                password: pass,
              })
            }
          />
          <Checkbox.Item
            label="Keep Sign in"
            position="leading"
            style={{ width: 160 }}
            status={"checked"}
            color={theme.colors.linkColor}
            onPress={() => handleStaySignIn()}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <ButtonComp btnText="Sign in" onPress={() => handleLogin()} />
          <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }}>
            <Text>Don't have an account?</Text>
          </TouchableOpacity>
          <Button
            style={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#29ABE2",
              width: 345,
              height: 50,
              borderRadius: 0,
              justifyContent: "center",
              margin: "auto",
              fontSize: 26,
            }}
            onPress={() => {
              alert("Component Under Development");
            }}
            textColor="#29ABE2"
          >
            CREATE AN ACCOUNT
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
}

export default withTheme(Login);
