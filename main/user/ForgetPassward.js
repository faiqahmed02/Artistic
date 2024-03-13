import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, withTheme } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth } from "../../firebaseConfig";
import InputComp from "../../component/mainscreen/InputComp";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { sendPasswordResetEmail } from "firebase/auth";

function Login({ theme, navigation }) {
  const [forgetPwdForm, setForgetPwdForm] = useState({});

  const handlePwdReset = () => {
    if (forgetPwdForm.email) {
      sendPasswordResetEmail(auth, forgetPwdForm.email)
        .then(() => {
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <LinearGradient
      style={{ alignItems: "center", padding: 10, flex:1, justifyContent:"center" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <KeyboardAwareScrollView>
        <View style={{alignItems: "center", marginVertical:50}}>
          <Image source={require("../../assets/logo.png")} />
          {/* <Text
            style={{
              textAlign: "center",
              fontSize: 13.5,
              lineHeight: 44,
              fontWeight: "400",
            }}
          >
            Forget Password?
          </Text> */}
        </View>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "600",
              fontSize: 18,
              lineHeight: 26,
              width: 197,
              maxWidth: "100%",
            }}
          >
            Reset Password
          </Text>
          <View style={{ marginTop: 15 }}>
            <InputComp
              placeholder="Email Address"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={(email) =>
                setForgetPwdForm({
                  ...forgetPwdForm,
                  email: email,
                })
              }
            />
          </View>
          <View style={{ alignItems: "center", marginBottom:20 }}>
            <ButtonComp
              btnText="Send Password Reset Link"
              onPress={() => handlePwdReset()}
            />
         
            <Button
              style={{
                marginTop:20,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#29ABE2",
                width: 345,
                maxWidth: "100%",
                height: 50,
                borderRadius: 0,
                justifyContent: "center",
                margin: "auto",
                fontSize: 26,
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
              textColor="#29ABE2"
            >
              LogIn
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

export default withTheme(Login);
