import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { withTheme } from "react-native-paper";
import InputComp from "../../component/mainscreen/InputComp";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import Popup from "../../component/mainscreen/Popup";
import { logIn } from "../../store/rootSlice";

function EditProfile({ theme, navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    pNumber: "",
    password: "",
    confirmP: "",
    username: "",
  });
  const [image, setImage] = React.useState(null);
  const state = useSelector((state) => state.signupState);
  const [emailValidate, setEmailValidate] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch()
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
  const validation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(formData.emailAddress) === true) {
      setEmailValidate(true);
    } else {
      alert("email not Correct!");
    }
  };
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    // async () => {
    dispatch(logIn(formData));
    navigation.navigate("Home");
    // };
  };

  const update = async () => {
    if (!formData.emailAddress || !formData.fullName) {
        alert("Enter Data")
    }else{
        await updateProfile(auth.currentUser, {
            email: formData.emailAddress,
            phoneNumber: formData.pNumber,
            displayName: formData.fullName,
            photoURL: image,
            disabled: false,
          }).then((re) => {
              setVisible(true);
          });
    }
   
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
              <FontAwesomeIcon icon={faCamera} color="white" size={50} />
            </TouchableOpacity>
          </View>

          <View>
            <InputComp
              placeholder={auth.currentUser ? auth.currentUser.displayName :"Full Name"}
              onChangeText={(name) =>
                setFormData({
                  ...formData,
                  fullName: name,
                })
              }
              inputMode="text"
            />
            <InputComp
              placeholder={auth.currentUser ? auth.currentUser.email : "Email Address"}
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
              placeholder={auth.currentUser ? auth.currentUser.phoneNumber : "Phone Number"}
              onChangeText={(num) =>
                setFormData({
                  ...formData,
                  pNumber: num,
                })
              }
              inputMode="tel"
            />
         
           
            <ButtonComp
              btnText="Update Profile"
              onPress={() => update()}
              width={"100%"}
            />
          </View>

          <Popup
            visible={visible}
            hideModal={hideModal}
            showModal={showModal}
            textforpopup="Profile Updated"
          />
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

export default withTheme(EditProfile);


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