import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { Image, StyleSheet, Text, View } from "react-native";
import ButtonComp from "./ButtonComp";
import { useNavigation } from "@react-navigation/native";

function ClassesCard() {
    const [classes, setClasses] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigation = useNavigation()
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const classesCollection = collection(db, "classes");
          const classesSnapshot = await getDocs(classesCollection);
          const classesData = classesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setClasses(classesData);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };
  
      fetchClasses();
  
      // Update current time every second
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 10000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, [currentTime]);
    // console.log(classes);
  return classes.map((d, i) => {
    return (
      <View style={styles.classes_card} key={i}>
        <View style={styles.classes_content}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../assets/classes_art.png")}
              style={styles.classes_img}
            />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontWeight: "600", fontSize: 17 }}>
                {d.details}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "300", fontSize: 14 }}>
                  Class Timing:
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    paddingLeft: 5,
                  }}
                >
                  {d.durationPerSession} hr.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "300", fontSize: 14 }}>
                  Class Held by:
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 14,
                    paddingLeft: 5,
                  }}
                >
                  {d.heldBy}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <View style={{ paddingBottom: 5 }}>
              <Text>Classes Curriculum and Theme</Text>
            </View>
            <View style={{ paddingBottom: 5 }}>
              <Text>ClassesArt Medium:</Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 300,
                  color: "#868889",
                }}
              >
                {d.medium}
              </Text>
            </View>
            <Text>Classes Material:</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#868889",
                paddingBottom: 5,
              }}
            >
              {d.material}
            </Text>
            <Text>Classes Skill Level:</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#868889",
                paddingBottom: 5,
              }}
            >
              {d.skillLevel}
            </Text>
            <Text>Classes Number of Sessions:</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#868889",
                paddingBottom: 5,
              }}
            >
              {d.numSessions}
            </Text>
            <Text>Classes Duration per session:</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#868889",
                paddingBottom: 5,
              }}
            >
              {d.durationPerSession} hr.
            </Text>
            <Text>Classes Price:</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 300,
                color: "#868889",
                paddingBottom: 5,
              }}
            >
              {d.price} hr.
            </Text>
          </View>
        </View>
        <View>
          <ButtonComp
            width={"100%"}
            btnText="Register"
            onPress={() => navigation.navigate("Subscriptions")}
          />
        </View>
      </View>
    );
  });
}

export default ClassesCard;


const styles = StyleSheet.create({
    classes_card: {
      width: 345,
      backgroundColor: "white",
      maxWidth: "100%",
      display: "flex",
      flexDirection: "column",
      marginTop: 10,
    },
    classes_content: {
      padding: 10,
    },
    classes_img: {
      width: 71,
      height: 70,
      borderRadius: 10,
    },
  });