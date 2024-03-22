import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, withTheme } from "react-native-paper";
import { auth } from "../../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import ButtonComp from "../../../component/mainscreen/ButtonComp";
import { getUser } from "../../../firestoreFunctions/User";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faL } from "@fortawesome/free-solid-svg-icons";
import EditOrder from "./EditeOrder";
import DropDownInput from "../../../component/mainscreen/DropDownInput";
import InputComp from "../../../component/mainscreen/InputComp";
import {
  addTrackingId,
  updateOrderStatus,
} from "../../../firestoreFunctions/Main";

function OrderDetails({ theme, navigation }) {
  const [orders, setOrders] = useState({});
  const route = useRoute();
  const { order } = route.params;
  const url = auth.currentUser ? auth.currentUser.photoURL : "";
  const [editOrder, setEditOrder] = useState(false);
  const [editOrderStatus, setEditOrderStatus] = useState(false);
  const [addOrderTackingId, setOrderTrackingId] = useState(false);
  const [user, setUser] = useState({});
  const [selected, setSelected] = useState(order.orderStatus);
  const orderStatus = ["Pending", "Canceled", "Completed", "Hold", "InProcess"];
  const [service, setService] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const trackingService = ["UPS", "FedEX"];
  //   const [formData, setFormData] =
  console.log(order);
  useEffect(() => {
    getUser(auth.currentUser.uid).then((res) => {
      console.log(auth.currentUser.uid);
    });
    editCurrentOrder();

    return () => {};
  }, [editOrder]);

  const editCurrentOrder = () => {
    if (auth.currentUser.uid === order.artistId[0]) {
      setEditOrder(true);
    } else {
      setEditOrder(false);
    }
  };
  const UpdateOrder = () => {
    if (addOrderTackingId) {
      const data = {
        service: service,
        tNumber: trackingNumber,
      };

      addTrackingId(order.id, data);
    }
    updateOrderStatus(order.id, selected);
  };
  const hideModal = () => setEditOrderStatus(false);
  return auth.currentUser ? (
    <LinearGradient
      style={{ alignItems: "center", flex: 1 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: 20,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
            // marginHorizontal:20
            padding: 10,
          }}
        >
          {editOrder === true ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
              onPress={() => setEditOrderStatus(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </TouchableOpacity>
          ) : (
            ""
          )}
          <View style={style.imgg}>
            <Image
              style={style.imgg}
              source={
                url ? { uri: url } : require("../../../assets/avatart.png")
              }
              width={100}
              height={100}
            />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Full Name</Text>
            <Text>{auth.currentUser.displayName}</Text>
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Email Address</Text>
            <Text>{auth.currentUser.email}</Text>
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text style={{ color: theme.colors.linkColor }}>Tracking ID</Text>
            <Text>
              {order.tNumber
                ? order.tNumber
                : "Not Assigned Yet"}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              width: 300,
              height: 1,
              marginTop: 20,
              borderColor: "#CACACA",
            }}
          ></View>
          <View style={style.card}>
            <View style={style.card_content}>
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
                  {order.orderNumber}
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
                  ${order.price}
                </Text>
              </View>
              <View>
                <Button
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    backgroundColor: "#FBB03B",
                  }}
                  //   loading={loading}
                  //   disabled={loading}
                  // onPress={() => deleteOrder(order.id)}
                >
                  {order.orderStatus}
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
                  {order.orderDate.toDate().getDate()}
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
                  {order.orderAddress.substring(0, 12)}....
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <EditOrder visible={editOrderStatus} hideModal={hideModal}>
        <View style={{ alignItems: "center" }}>
          <DropDownInput
            data={orderStatus}
            placeholder={"Update Order Status"}
            selected={selected}
            setSelected={setSelected}
          />
          {!addOrderTackingId ? (
            <TouchableOpacity
              onPress={() => setOrderTrackingId(true)}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  letterSpacing: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 10,
                }}
              >
                Add Tracking Id
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={{ marginTop: 10 }}></View>

              <DropDownInput
                data={trackingService}
                placeholder={"Select Service Provider"}
                selected={service}
                setSelected={setService}
              />
              <InputComp
                placeholder="Tracking Id"
                // text={trackingNumber}
                onChangeText={(text) => setTrackingNumber(text)}
                inputMode={"numeric"}
              />
            </>
          )}
          <ButtonComp btnText="Update" onPress={() => UpdateOrder()} />
          {addOrderTackingId ? (
            <TouchableOpacity
              onPress={() => setOrderTrackingId(false)}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  letterSpacing: 10,
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 10,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>
      </EditOrder>
    </LinearGradient>
  ) : (
    navigation.navigate("Login")
  );
}

export default withTheme(OrderDetails);

const style = StyleSheet.create({
  main_con: {},
  imgg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
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
});
