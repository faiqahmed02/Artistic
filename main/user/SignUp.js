import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
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
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { addUser, getUser } from "../../firestoreFunctions/User";
import { updateProfile } from "firebase/auth";

function SignUp({ theme, navigation }) {
  const [visible, setVisible] = React.useState(false);
  const state = useSelector((state) => state.signupState);
  const userstate = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAdress: "",
    pNumber: "",
    password: "",
    confirmP: "",
    username: ""
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
  const updateUserData = () => {

  }
  const createAccount = async () => {
    if (
      formData.fullName &&
      formData.emailAdress &&
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
          await createUserWithEmailAndPassword(auth, formData.emailAdress, formData.password)
            .then(async (userCredential) => {
              // Signed up 
              const user = userCredential.user;
              console.log(user);
              const data = {
                name: formData.fullName,
                role: state.user_role,
                emailAdress: formData.emailAdress,
                pNumber: formData.pNumber,
                username: formData.username,
                dateCreated: new Date()

          

              }
              
              await signInWithEmailAndPassword(auth, formData.emailAdress, formData.password).then(async (res) => {
                // auth.currentUser({
                //   email: formData.emailAdress,
                //   emailVerified: false,
                //   phoneNumber: formData.pNumber,
                //   password: formData.password,
                //   displayName: formData.fullName,
                //   photoURL: image,
                //   disabled: false,
                // })
               
                dispatch(logIn(auth.currentUser));
                await updateProfile(auth.currentUser, {
                  email: formData.emailAdress,
                  emailVerified: false,
                  phoneNumber: formData.pNumber,
                  password: formData.password,
                  displayName: formData.fullName,
                  photoURL: image,
                  disabled: false,
                }).then(async () => {
                  // Profile updated!
                  addUser(user.uid, data).then((res) => {
                    getUser(auth.currentUser.uid).then((res) => {
                      dispatch(userTypeReducer(res))
                    })
                  })
                  await sendEmailVerification(auth.currentUser).then((res) => {
                  alert("An email verfification email has been sent")
                  }).catch((err) => {
                    alert("Error in sending email")
                  })
                  // See the UserRecord reference doc for the contents of userRecord.
                  console.log('Successfully created new user:', userRecord.uid);
                  console.log("updated");
                  // ..
                }).catch((error) => {
                  // An error occurred
                  // ...
                  console.log(error);
                })
                  .then((userRecord) => {

                  })
                  .catch((error) => {
                    console.log('Error creating new user:', error);
                  });
              })


              console.log('User created successfully:', user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
          // Add user data to Firestore

        } catch (error) {
          console.error('Error creating user:', error.message);
        }
        console.log(state);
        setVisible(true);
      }
    } else {
      alert("Data not there");
    }
  };

  const validation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(formData.emailAdress) === true) {
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
    dispatch(logIn(formData));
    navigation.navigate("Home")
    console.log(userstate);
    // };
  };




  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <ScrollView style={styles.signupScreen}>
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
                emailAdress: email,
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
          <ButtonComp btnText="Create Account" onPress={() => createAccount()} />
        </View>
        <Popup visible={visible} hideModal={hideModal} showModal={showModal} />
      </ScrollView>
    </LinearGradient>
  );
}

export default withTheme(SignUp);

const styles = StyleSheet.create({
  signupScreen: {
    height: Dimensions.get("window").height,
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
