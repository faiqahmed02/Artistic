import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../../firebaseConfig";
import { onShare } from "../../firestoreFunctions/Main";

function RelatedProduct({ width, height, id }) {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

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
    // <ScrollView horizontal>
    products
      ?.filter((d) => d.id != id)
      .map((d, i) => {
        return (
          // <TouchableOpacity>
          <View
            key={i}
            style={{
              width: width ? width : 170,
              maxHeight:'100%',
              maxWidth:"100%",
              height: height ? height : "auto",
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
                  <Image source={require("../../assets/favourite_icon.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goToProductPage(d)}>
                  <Image source={require("../../assets/cart_icon.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require("../../assets/like_icon.png")} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require("../../assets/vr_icon.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity
              // style={{ bottom: 10, left: 10, position: "absolute" }}
              onPress={() => onShare()}
              >
                <Image source={require("../../assets/share.png")} />
              </TouchableOpacity>
            </View>
          </View>
          // </TouchableOpacity>
        );
      })

    //   {/* <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Image
    //       style={styles.relatedProduct}
    //       source={require("../../assets/related_product.png")}
    //     />
    //   </TouchableOpacity> */}
    // {/* </ScrollView> */}
  );
}

export default RelatedProduct;

const styles = StyleSheet.create({
  relatedProduct: {
    // margin: 3,
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 5,
  },
});
