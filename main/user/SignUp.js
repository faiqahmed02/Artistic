import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import InputComp from "../../component/mainscreen/InputComp";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { useState } from "react";
import { logIn, signUpReducer, userTypeReducer } from "../../store/rootSlice";
import Popup from "../../component/mainscreen/Popup";
import { auth, db } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addUser, getUser } from "../../firestoreFunctions/User";
import { updateProfile } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function SignUp({ theme, navigation }) {
  const [visible, setVisible] = React.useState(false);
  const state = useSelector((state) => state.signupState);
  const userstate = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    pNumber: "",
    password: "",
    confirmP: "",
    username: "",
  });
  const [emailValidate, setEmailValidate] = useState(false);
  const [pwdValidation, setPwdValidation] = useState(true);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const updateUserData = () => {};
  const createAccount = async () => {
    if (
      formData.fullName &&
      formData.emailAddress &&
      formData.pNumber &&
      formData.password &&
      formData.confirmP
    ) {
      if (emailValidate === true) {
        console.log(formData);
        dispatch(
          signUpReducer({
            ...state,
            user_data: formData,
          })
        );
        try {
          // Create user with email and password
          // const { user } = await auth.createUserWithEmailAndPassword(formData.emailAdress, formData.password);
          await createUserWithEmailAndPassword(
            auth,
            formData.emailAddress,
            formData.password
          )
            .then(async (userCredential) => {
              // Signed up
              const user = userCredential.user;

              await updateProfile(auth.currentUser, {
                displayName: formData.fullName,
                photoURL: image,
              }).then((res) => {
                console.log(user);
               
              });
              dispatch(logIn(auth.currentUser))
              setVisible(true);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
          // Add user data to Firestore
        } catch (error) {
          console.error("Error creating user:", error.message);
          alert("Error creating user:", error.message);
        }
      }
    } else {
      alert("Data not there");
    }
  };

  const validation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(formData.emailAddress) === true) {
      setEmailValidate(true);
    } else {
      alert("email not Correct!");
    }
  };
  console.log(state);
  const checkPwd = () => {
    if (formData.password !== formData.confirmP) {
      setPwdValidation(false);
      alert("Pws did not matched");
    } else {
      setPwdValidation(true);
    }
  };
  // console.log(formData);

  // Modal

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    // async () => {
    navigation.navigate("Home");
    // };
  };

  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <KeyboardAwareScrollView>
        <View style={{ padding: 10, paddingTop: 40 }}>
          <Text style={styles.textD}>Create Account as a</Text>
          <Text style={styles.accT}>
            {state.user_role ? state.user_role : ""}
          </Text>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={pickImage}
              style={{
                height: 100,
                width: 100,
                maxWidth: "100%",
                borderRadius: 50,
                backgroundColor: "black",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  width={100}
                  height={100}
                  style={{ borderRadius: 50 }}
                />
              )}
              {!image && (
                <FontAwesomeIcon icon={faCamera} color="white" size={50} />
              )}
            </TouchableOpacity>
          </View>

          <View>
            <InputComp
              placeholder="Full Name"
              onChangeText={(name) =>
                setFormData({
                  ...formData,
                  fullName: name,
                })
              }
              inputMode="text"
            />
            <InputComp
              placeholder="User Name"
              onChangeText={(uname) =>
                setFormData({
                  ...formData,
                  username: uname,
                })
              }
            />
            <InputComp
              placeholder="Email Address"
              onChangeText={(email) =>
                setFormData({
                  ...formData,
                  emailAddress: email,
                })
              }
              inputMode="email"
              error={emailValidate === false ? true : false}
              onPressOut={validation}
            />
            <InputComp
              placeholder="Phone Number"
              onChangeText={(num) =>
                setFormData({
                  ...formData,
                  pNumber: num,
                })
              }
              inputMode="tel"
            />
            <InputComp
              right={true}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(pwd) =>
                setFormData({
                  ...formData,
                  password: pwd,
                })
              }
            />
            <InputComp
              right={true}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(cpwd) =>
                setFormData({
                  ...formData,
                  confirmP: cpwd,
                })
              }
              error={pwdValidation}
              onPressOut={checkPwd}
            />
            <InputComp
              placeholder="Security Code"
              onChangeText={(seq) => console.log(seq)}
            />
            <ButtonComp
              btnText="Create Account"
              onPress={() => createAccount()}
              width={"100%"}
            />
          </View>

          <Popup
            visible={visible}
            hideModal={hideModal}
            showModal={showModal}
          />
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient> 
  );
}

export default withTheme(SignUp);

const styles = StyleSheet.create({
  signupScreen: {
    padding: 20,
    // width: Dimensions.get("window").width,
  },
  textD: {
    color: "#1B1B1B",
    fontSize: 24,
    // fontFamily: "Roboto",
    fontWeight: "900",
  },
  accT: {
    color: "#C1272D",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 30,
  },
});
