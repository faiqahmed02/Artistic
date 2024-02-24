import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, withTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { addUser, getUser } from "../../firestoreFunctions/User";
import { logIn, userTypeReducer } from "../../store/rootSlice";
import InputComp from "../../component/mainscreen/InputComp";
import ButtonComp from "../../component/mainscreen/ButtonComp";

function Login({ theme, navigation }) {
  const [loginForm, setLoginForm] = useState({});
  const [checked, setChecked] = useState("unchecked");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userData = await getUser(auth.currentUser.uid);
        dispatch(userTypeReducer(userData));
      }
    };

    fetchUserData();
  }, [auth.currentUser, dispatch]);

  const handleStaySignIn = () => {
    if (checked !== "checked") {
      if (loginForm.email) {
        setChecked("checked");
        dispatch(userCredentialse(loginForm));
      }
    } else {
      setChecked("unchecked");
    }
  };

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then((res) => {
          dispatch(logIn(auth.currentUser));
  
          if (auth.currentUser) {
            getUser(auth.currentUser.uid)
              .then((userData) => {
                dispatch(userTypeReducer(userData));
              })
              .catch((getUserError) => {
                console.error("Error fetching user data:", getUserError.message);
              });
          }
  
          const user = auth.currentUser;
          const data = {
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            displayName: user.displayName,
          };
  
          // addUser(auth.currentUser.uid, data); // Uncomment if needed
  
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.error("Login failed:", error.message);
          alert("Login failed. Please check your credentials and try again.");
        });
    } else {
      alert("Please enter both email and password.");
    }
  };
  

  return (
    <LinearGradient
      style={{ alignItems: "center", padding: 10 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <KeyboardAwareScrollView>
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
            Welcome To The Vibrant World of Arts.
          </Text>
          <View style={{ marginTop: 15 }}>
            <InputComp
              placeholder="Email Address"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={(email) =>
                setLoginForm({
                  ...loginForm,
                  email: email,
                })
              }
            />
            <InputComp
              placeholder="Password"
              secureTextEntry={true}
              right={true}
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
                maxWidth: "100%",
                height: 50,
                borderRadius: 0,
                justifyContent: "center",
                margin: "auto",
                fontSize: 26,
              }}
              onPress={() => {
                navigation.navigate("Select Account");
              }}
              textColor="#29ABE2"
            >
              CREATE AN ACCOUNT
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

export default withTheme(Login);
