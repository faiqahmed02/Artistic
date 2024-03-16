import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, View, Image,StyleSheet} from "react-native";
import { Chip, Modal, Portal, withTheme } from "react-native-paper";
import {
  artMediumData,
  digitalPanting,
  material,
  schoolsOfArt,
  subject,
  type,
} from "./ProductData";
import { Picker } from "@react-native-picker/picker";
import RelatedProduct from "../RelatedProduct";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function Showroom({ theme }) {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [artWorkType, setArtWorkType] = useState("");
  const [artMedium, setArtMedium] = useState([]);
  const [artSchool, setArtSchool] = useState([]);
  const [artSubject, setArtSubject] = useState([]);
  const [artMaterial, setArtMaterial] = useState([]);
  const [artPaintingType, setArtPaintingType] = useState([]);
  const [showPick, setShowPick] = useState(false);

  const selectArtWork = (itemValue, itemIndex) => {
    setArtWorkType(itemValue);
    setShowPick(false);
  };
  const hideModal = () => setShowPick(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const paintingsCollection = collection(db, "paintings");
        const paintingsSnapshot = await getDocs(paintingsCollection);
        const paintingsData = paintingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(paintingsData);
        setLoading(false);
        // console.log(products);
      } catch (error) {
        console.error("Error fetching paintings:", error);
        setLoading(false);
      }
    };

    fetchEvents();

    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentTime]);
  // console.log(auth.currentUser.uid);
  // console.log(products);
  const goToProductPage = (data) => {
    navigation.navigate("Product Page", { productId: data });
  };
  return (
    <LinearGradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <View>
        <Portal>
          <Modal
            visible={showPick}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Picker
              selectedValue={artWorkType}
              onValueChange={(itemValue, itemIndex) =>
                selectArtWork(itemValue, itemIndex)
              }
            >
              {artMediumData.map((d) => {
                return <Picker.Item key={d} label={d.name} value={d.name} />;
              })}
            </Picker>
          </Modal>
        </Portal>
        {/* <ScrollView horizontal> */}
        {/* <View style={{ marginRight:10, height:"100%"}}> */}
        {/* {showPick ? (
        
        ) : null} */}
        <ScrollView horizontal>
          <Chip
            icon="check"
            // rippleColor={'#C1272D'}
            showSelectedCheck={true}
            onPress={() => setShowPick(true)}
            style={{
              backgroundColor: "#29ABE2",
              color: "white",
              marginHorizontal: 5,
            }}
            textStyle={{ color: "white" }}
          >
            {artWorkType ? artWorkType : "Select Art Work Type"}
          </Chip>
          <Chip
            icon="close"
            onPress={() => console.log("Pressed")}
            style={{
              backgroundColor: "#29ABE2",
              color: "white",
              marginHorizontal: 5,
            }}
            textStyle={{ color: "white" }}
          >
            Trending Art
          </Chip>
          <Chip
            icon="close"
            onPress={() => console.log("Pressed")}
            style={{
              backgroundColor: "#29ABE2",
              color: "white",
              marginHorizontal: 5,
            }}
            textStyle={{ color: "white" }}
          >
            Top 1000
          </Chip>
        </ScrollView>
        {/* </ScrollView> */}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ScrollView>
          {products.map((d, i) => {
              return (
                // <TouchableOpacity>
                <View
                  key={i}
                  style={{
                    width: 334,
                    maxHeight: "100%",
                    maxWidth: "100%",
                    height: 197,
                    margin: 3,
                    borderRadius: 5,
                    overflow: "hidden",
                  }}
                >
                  <ImageBackground
                    style={styles.relatedProduct}
                    source={{ uri: d.imageUrl }}
                    resizeMode="cover"
                  />

                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row-reverse",
                    }}
                  >
                    {/* <View></View> */}
                    <View>
                      <TouchableOpacity>
                        <Image
                          source={require("../../../assets/favourite_icon.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => goToProductPage(d)}>
                        <Image
                          source={require("../../../assets/cart_icon.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={require("../../../assets/like_icon.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={require("../../../assets/vr_icon.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                    // style={{ bottom: 10, left: 10, position: "absolute" }}
                    >
                      <Image source={require("../../../assets/share.png")} />
                    </TouchableOpacity>
                  </View>
                </View>
                // </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

export default withTheme(Showroom);

const styles = StyleSheet.create({
    relatedProduct: {
      // margin: 3,
      width: "100%",
      height: "100%",
      position: "absolute",
      borderRadius: 5,
    },
  });
