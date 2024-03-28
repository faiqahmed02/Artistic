import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { Avatar, withTheme } from "react-native-paper";
import { getAllurers } from "../../firestoreFunctions/User";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAllFollowers, getFollowers } from "../../firestoreFunctions/Main";

function Follower() {
  const [artist, setArtist] = useState([]);
  const [artistIds, setArtistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());
  //   console.log(auth.currentUser.uid);

  // Function to fetch user data based on follower IDs
  const fetchUserData = async () => {
    // Array to store user data
    const usersData = [];
    for (const followerId of artistIds) {
      try {
        const userDoc = await getDoc(doc(db, "users", followerId)); // Assuming users are stored in a collection called 'users'
        if (userDoc.exists()) {
          usersData.push({ id: userDoc.id, ...userDoc.data() }); // Add user data to the array
          setArtist(usersData);
        } else {
          console.log(`User with ID ${followerId} does not exist.`);
        }
      } catch (error) {
        console.error(`Error fetching user with ID ${followerId}:`, error);
      }
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getFollowers(auth.currentUser.uid).then((res) => {
        setArtistIds(res);
        fetchUserData().then(() => {
            setLoading(false);
        })
      
     

        console.log(artistIds);
      });
    }

    // listUsersByLoggedInUser(auth.currentUser.uid).then((res) => {
    //   const artistData = res;

    //   setArtist(artistData);
    // });

    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentTime]);
  // console.log(artist);

  const viewArtist = (d) => {
    // console.log(d);
    navigation.navigate("View Artist", {
      artistId: d,
    });
  };

  return !loading ? (
    artist.map((d, i) => {
      const nameArray = d.fullName.split(" ");
      const firstNameIn = nameArray[0].charAt(0).toUpperCase();
      const lastNameIn = nameArray[nameArray.length - 1]
        .charAt(0)
        .toUpperCase();
      const n = firstNameIn + lastNameIn;

      // return initials;
      return (
        <TouchableOpacity key={i} onPress={() => viewArtist(d)}>
          <View style={styles.productCard}>
            {d.photoURL ? (
              <Image
                style={styles.productImg}
                source={
                  d.photoURL
                    ? { uri: d.photoURL }
                    : require("../../assets/product_img_1.png")
                }
              />
            ) : (
              <Avatar.Text label={n} size={100} />
            )}

            <Text style={styles.productTitle}>{d.fullName}</Text>
          </View>
        </TouchableOpacity>
      );
    })
  ) : (
    <Text>"Loading..."</Text>
  );
}

export default withTheme(Follower);

const styles = StyleSheet.create({
  //   Product
  productCard: {
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  productImg: {
    width: 100,
    height: 97,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  productTitle: {
    fontSize: 14,
    width: 100,
    fontWeight: "600",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
});
