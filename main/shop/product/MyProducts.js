import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { withTheme } from "react-native-paper";
import ProductCard from "../../../component/mainscreen/ProductCard";
import { ScrollView, View } from "react-native";
import { auth } from "../../../firebaseConfig";

function MyProducts({ theme, navigation }) {
  let id = auth.currentUser ? auth.currentUser.uid : null 
  return (
    <LinearGradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1, paddingTop:20 }}
    >
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
        <ProductCard _id={id}/>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default withTheme(MyProducts);
