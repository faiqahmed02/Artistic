import React, { useState, useRef, useEffect } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { Text, View, SafeAreaView } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import img1 from "../../assets/ban_1.png";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../../firestoreFunctions/Main";

const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/UYiroysl.jpg",
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg",
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg",
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];
const { width: screenWidth } = Dimensions.get("window");
function Banner() {
  const imgArr = [img1, img1, img1, img1, img1, img1, img1, img1];
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts().then((res) => {
      // console.log(res);
      const newImageArr = res.filter((d) => d.imageUrl);
      // console.log(newImageArr);
      setProducts(res);
      setLoading(false);
      // console.log(products)
    });

    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentTime]);
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(products);
  }, [loading]);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Showrooms")}>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.imageUrl }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {/* <Text style={styles.title} numberOfLines={2}>
          {item.artWorkName}
        </Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  return !loading ? (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={goForward}> */}
      {/* <Text>go to next slide</Text> */}
      {/* </TouchableOpacity> */}
      <Carousel
        autoplay
        autoplayDelay={1}
        loop
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  ) : (
    ""
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
