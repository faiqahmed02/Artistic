import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { auth } from "../../firebaseConfig";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { getUser } from "../../firestoreFunctions/User";

function Profile({ theme, navigation }) {
  const url = auth.currentUser ? auth.currentUser.photoURL : "";
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser(auth.currentUser.uid).then((res) => {
      console.log(res);
      setUser(res);
      setLoading(false)
    });
  }, []);

  // // console.log(url);
  return auth.currentUser ? (
    <LinearGradient
      style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <View style={{ justifyContent: "center" }}>
        {!loading ? (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
              width: "100%",
              // backgroundColor:"black",
              // marginHorizontal:20
              padding: 10,
            }}
          >
            <View style={style.imgg}>
              <Image
                style={style.imgg}
                source={
                  url ? { uri: url } : require("../../assets/avatart.png")
                }
                width={100}
                height={100}
              />
            </View>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Text style={{ color: theme.colors.linkColor }}>Full Name</Text>
              <Text>{auth.currentUser.displayName}</Text>
            </View>
            {user.userRole === "Business" ? (
              <View style={{ alignItems: "center", marginVertical: 10 }}>
                <Text style={{ color: theme.colors.linkColor }}>
                  Store Name
                </Text>
                <Text>{user.businessName}</Text>
              </View>
            ) : (
              ""
            )}
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Text style={{ color: theme.colors.linkColor }}>
                Email Address
              </Text>
              <Text>{auth.currentUser.email}</Text>
            </View>
            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <Text style={{ color: theme.colors.linkColor }}>
                Phone Number
              </Text>
              <Text>
                {auth.currentUser.phoneNumber
                  ? auth.currentUser.phoneNumber
                  : "+11111111111"}
              </Text>
            </View>

            <ButtonComp
              btnText={"Edit"}
              onPress={() => navigation.navigate("Edit Profile")}
            />
          </View>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </LinearGradient>
  ) : (
    navigation.navigate("Login")
  );
}

export default withTheme(Profile);

const style = StyleSheet.create({
  main_con: {},
  imgg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
