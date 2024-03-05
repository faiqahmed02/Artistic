import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { db } from "../../firebaseConfig";

const artworks = [
  {
    id: 1,
    artistName: "John Doe",
    artworkName: "Sunset at Sea",
    price: 250,
    artworkType: "Painting",
    artworkSize: "24x36 inches",
    artworkWeight: "2 kg",
    quantity: 1,
    description:
      "A beautiful painting depicting a serene sunset over the ocean.",
    artWorkImage: require("../../assets/product_img_1.png"),
  },
  {
    id: 2,
    artistName: "Jane Smith",
    artworkName: "Abstract Reflections",
    price: 180,
    artworkType: "Sculpture",
    artworkSize: "12x18x10 inches",
    artworkWeight: "3.5 kg",
    quantity: 3,
    description:
      "An abstract sculpture reflecting multiple emotions and shapes.",
    artWorkImage: require("../../assets/product_img_1.png"),
  },
  {
    id: 3,
    artistName: "Michle Jackson",
    artworkName: "Reflections Jackson",
    price: 980,
    artworkType: "Sculpture",
    artworkSize: "12x18x10 inches",
    artworkWeight: "3.5 kg",
    quantity: 3,
    description:
      "An abstract sculpture reflecting multiple emotions and shapes.",
    artWorkImage: require("../../assets/product_img_1.png"),
  },
  // Add more artworks as needed
];

function ProductCard({horizontal}) {
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
  }, []);

  // console.log(products);
  const goToProductPage = (data) => {
    navigation.navigate("Product Page", { productId: data });
  };
  return (
    <ScrollView horizontal={horizontal ? horizontal : true} style={{ maxHeight: 190 }}>
      {products.map((d, i) => {
        return (
          <View style={styles.productCard} key={i}>
            <Image style={styles.productImg} source={{uri:d.imageUrl}} />
            <Text style={styles.productTitle}>{d.artWorkName}</Text>
            <Text style={styles.productPrice}>${d.price}</Text>
            <TouchableOpacity onPress={() => goToProductPage(d)}>
              <Text style={styles.productBtn}>View Product</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  //   Product
  productCard: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  productImg: {
    width: 128,
    height: 97,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
  productPrice: {
    color: "#29ABE2",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
  },
  productBtn: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "center",
  },
});
