import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function Stats() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.card}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#7E7E7C", fontSize: 15 }}>
            Total Amount in Wallet
          </Text>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>$ 595.99</Text>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#7E7E7C",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <View>
            <Text style={{ color: "#7E7E7C", fontSize: 15 }}>Orders</Text>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>20</Text>
          </View>
          <View>
            <Text style={{ color: "#7E7E7C", fontSize: 15 }}>Total Items</Text>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>150</Text>
          </View>
          <View>
            <Text style={{ color: "#7E7E7C", fontSize: 15 }}>Pending</Text>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>5</Text>
          </View>
        </View>
        <Image
          source={require("../../assets/state.png")}
          style={{ top: 20, position: "absolute", right: -10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 339,
    maxWidth: "100%",
    backgroundColor: "white",
    margin: "auto",
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
  },
});

export default Stats;
