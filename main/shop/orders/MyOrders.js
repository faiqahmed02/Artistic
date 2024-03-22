import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, withTheme } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getAllOrders } from "../../../firestoreFunctions/Main";
import { auth, db } from "../../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

function MyOrders({ theme, navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // setInterval(() => {
    if (auth.currentUser) {
      getAllOrders(auth.currentUser.uid).then((res) => {
        const ordersData = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
        // console.log(orders);
        if (loading) {
          setLoading(false);
        }
      });
    } else {
      navigation.navigate("Login");
    }

    // setCurrentTime(new Date());
    // setLoading(false)
    // console.log(orders);
    // }, 5000);

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentTime]);

  const deleteOrder = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, "orders", id))
      .then(() => {
        // alert("Deleted");
        setLoading(false);
      })
      .catch(() => {
        alert("Error");
        setLoading(false);
      });
    // console.log(id);
  };

  const orderDetals = (d) => {
    // console.log(d);
    navigation.navigate("Order Details", {
      order: d,
    });
  };
  return (
    <LinearGradient
      style={{ alignItems: "center", flex: 1 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <ScrollView style={{ padding: 10 }}>
        {/* <TouchableOpacity> */}
        {loading ? (
          <Text>loading...</Text>
        ) : (
          orders.map((d, i) => {
            return (
              <TouchableOpacity onPress={() => orderDetals(d)} key={i}>
                <View style={styles.card}>
                  <View style={styles.card_content}>
                    <View>
                      <Image
                        source={require("../../../assets/ORDER_PIC.png")}
                        style={{ width: 69, height: 72, borderRadius: 10 }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 10,
                        }}
                      >
                        Walish Art
                      </Text>
                      <Text
                        style={{
                          color: "#8E8E93",
                          fontSize: 16,
                          fontWeight: "300",
                        }}
                      >
                        Order Number
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 10,
                        }}
                      >
                        {d.orderNumber}
                      </Text>
                      <Text
                        style={{
                          color: "#8E8E93",
                          fontSize: 16,
                          fontWeight: "300",
                        }}
                      >
                        Price
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 10,
                        }}
                      >
                        ${d.price}
                      </Text>
                    </View>
                    <View>
                      <Button
                        style={
                          d.orderStatus === "Completed"
                            ? styles.statusBtnComp
                            : d.orderStatus === "Hold"
                            ? styles.statueBtnHold
                            : d.orderStatus === "Canceled"
                            ? styles.statueBtnCancel
                            : styles.statueBtnPen
                        }
                        loading={loading}
                        disabled={loading}
                        textColor="white"
                        // onPress={() => deleteOrder(d.id)}
                      >
                        {d.orderStatus}
                      </Button>
                      <Text
                        style={{
                          color: "#8E8E93",
                          fontSize: 16,
                          fontWeight: "300",
                        }}
                      >
                        Order Date
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 10,
                        }}
                      >
                        {d.orderDate.toDate().getDate()}
                      </Text>
                      <Text
                        style={{
                          color: "#8E8E93",
                          fontSize: 16,
                          fontWeight: "300",
                        }}
                      >
                        Address
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          paddingBottom: 10,
                        }}
                      >
                        {d.orderAddress.substring(0, 12)}....
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* </TouchableOpacity> */}
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
    justifyContent: "space-around",
  },
  statusBtnComp: {
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#3B75FB",
  },
  statueBtnPen: {
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#FBB03B",
  },
  statueBtnHold: {
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#FF0095 FC352E",
    fontWeight:"700"
    
  },
  statueBtnCancel: {
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#FC352E",
    fontWeight:"700"
    
  },
});
