import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, withTheme } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function MyOrders({ theme, navigation }) {
  return (
    <LinearGradient
      style={{ alignItems: "center" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <ScrollView style={{ padding: 10 }}>
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={styles.card_content}>
              <View>
                <Image source={require("../../../assets/ORDER_PIC.png")} style={{width:69, height:72, borderRadius:10}} />
              </View>
              <View>
                <Text style={{fontSize:16, fontWeight:"500", paddingBottom:10}}>Walish Art</Text>
                <Text style={{color:"#8E8E93", fontSize:16, fontWeight:'300'}}>Order Number</Text>
                <Text style={{fontSize:16, fontWeight:"500", paddingBottom:10}}>#7695480</Text>
                <Text style={{color:"#8E8E93", fontSize:16, fontWeight:'300'}}>Price</Text>
                <Text style={{fontSize:16, fontWeight:"500", paddingBottom:10}}>$30</Text>
              </View>
              <View>
                <Button style={{fontSize:16, fontWeight:"500", backgroundColor:"#FBB03B"}}>InProcess</Button>
                <Text style={{color:"#8E8E93", fontSize:16, fontWeight:'300'}}>Order Date</Text>
                <Text style={{fontSize:16, fontWeight:"500", paddingBottom:10}}>{new Date().getDate()}</Text>
                <Text style={{color:"#8E8E93", fontSize:16, fontWeight:'300'}}>Address</Text>
                <Text style={{fontSize:16, fontWeight:"500", paddingBottom:10}}>Kitchen A -</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

export default withTheme(MyOrders);

const styles = StyleSheet.create({
  card: {
    width: 341,
    // height:253,
    // maxHeight:"100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
  },
  card_content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-around"
  },
});
