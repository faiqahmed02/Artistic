import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Chip, Modal, Portal, TextInput, withTheme } from "react-native-paper";
import {
  artMediumData,
  digitalPanting,
  material,
  materialData,
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
import ProductFilter from "./ProductFilter";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { onShare } from "../../../firestoreFunctions/Main";

function Showroom({ theme }) {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [artWorkType, setArtWorkType] = useState("");
  const [artMedium, setArtMedium] = useState("");
  const [artSchool, setArtSchool] = useState();
  const [artSubject, setArtSubject] = useState();
  const [searchText, setSearchText] = useState("");
  const [artMaterial, setArtMaterial] = useState();
  const [artPaintingType, setArtPaintingType] = useState();
  const [showPick, setShowPick] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const selectArtMedium = (itemValue, itemIndex) => {
    setArtMedium(itemValue);
    setShowPick(false);
  };

  const selectArtSchool = (itemValue, itemIndex) => {
    setArtSchool(itemValue);
    setShowPick(false);
  };
  const selectArtSubject = (itemValue, itemIndex) => {
    setArtSubject(itemValue);
    setShowPick(false);
  };
  const hideModal = () => setShowPick(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const showModal = (data) => {
    if (data === type) {
      // setShowPick(true)
      // setS
    }
    setShowPick(true);
    setData(data);
  };
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
  console.log(artMedium);
  const filteredData = products.filter((item) => {
    if (
      // artMaterial ||
      artMedium ||
      // artWorkType ||
      artSchool ||
      artSubject
      // artPaintingType
    ) {
      return (
        item.artMedium.includes(artMedium) ||
        item.artSchool.includes(artSchool) ||
        item.artSubject.includes(artSubject)
      );
    }
    // Check if 'swimming' or 'English' exists in either hobbies or languages

    return products;
  });
  // console.log(filteredData);
  return (
    <LinearGradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1, paddingTop: 20 }}
    >
      <View>
        <ProductFilter
          showPick={data === artMediumData ? true : false}
          hideModal={hideModal}
          data={artMediumData}
          value={artMedium}
          selectedData={selectArtMedium}
          containerStyle={containerStyle}
          setData={setData}
        />
        <ProductFilter
          showPick={data === schoolsOfArt ? true : false}
          hideModal={hideModal}
          data={schoolsOfArt}
          value={artSchool}
          selectedData={selectArtSchool}
          containerStyle={containerStyle}
          setData={setData}
        />
        <ProductFilter
          showPick={data === subject ? true : false}
          hideModal={hideModal}
          data={subject}
          value={artSubject}
          selectedData={selectArtSubject}
          containerStyle={containerStyle}
          setData={setData}
        />
        {/* <ScrollView horizontal> */}
        {/* <View style={{ marginRight:10, height:"100%"}}> */}
        {/* {showPick ? (
        
        ) : null} */}
        <View style={{ margin: 10 }}>
          <ScrollView horizontal>
            <Chip
              // icon="check"
              // rippleColor={'#C1272D'}
              // showSelectedCheck={true}
              onPress={() => showModal(artMediumData)}
              style={{
                backgroundColor: "#28ABE3",
                color: "white",
                marginHorizontal: 5,
              }}
              textStyle={{ color: "white" }}
            >
              {artMedium ? artMedium : "Select Art Medium"}
            </Chip>
            <Chip
              // icon="check"
              // rippleColor={'#C1272D'}
              // showSelectedCheck={true}
              onPress={() => showModal(schoolsOfArt)}
              style={{
                backgroundColor: "#28ABE3",
                color: "white",
                marginHorizontal: 5,
              }}
              textStyle={{ color: "white" }}
            >
              {artSchool ? artSchool : "Select School of Art"}
            </Chip>
            <Chip
              // icon="check"
              // rippleColor={'#C1272D'}
              // showSelectedCheck={true}
              onPress={() => showModal(subject)}
              style={{
                backgroundColor: "#28ABE3",
                color: "white",
                marginHorizontal: 5,
              }}
              textStyle={{ color: "white" }}
            >
              {artSubject ? artSubject : "Select Art Subject"}
            </Chip>
            {artMedium || artWorkType || artSchool || artSubject ? (
              <Chip
                // icon="close"
                onPress={() => {
                  setArtMedium("") ||
                    setArtWorkType("") ||
                    setArtSchool("") ||
                    setArtSubject("");
                }}
                style={{
                  backgroundColor: "#28ABE3",
                  color: "white",
                  marginHorizontal: 5,
                }}
                textStyle={{ color: "white" }}
              >
                Clear Filter
              </Chip>
            ) : (
              ""
            )}
          </ScrollView>
          <TextInput
            label="Search By Art Work Name"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            outlineColor="#29ABE3"
            style={{
              marginTop:10,
              borderColor: "none", // if you need
              //   borderWidth:1,
              overflow: "hidden",
              shadowColor: "black",
              shadowRadius: 10,
              shadowOpacity: 1,
              marginBottom: 10,
              backgroundColor: "white",
              width: "100%",
            }}
          />
        </View>
        {/* </ScrollView> */}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ScrollView>
          {filteredData
            .filter((d) =>
              searchText
                ? d.artWorkName.toLowerCase().includes(searchText.toLowerCase())
                : d
            )
            .map((d, i) => {
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
                    onPress={() => onShare()}
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
