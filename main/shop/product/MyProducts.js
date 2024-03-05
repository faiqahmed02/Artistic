import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { withTheme } from "react-native-paper";
import ProductCard from "../../../component/mainscreen/ProductCard";

function MyProducts({ theme, navigation }) {
  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]} style={{flex:1}}>
      <ProductCard horizontal={false} />
    </LinearGradient>
  );
}

export default withTheme(MyProducts);
