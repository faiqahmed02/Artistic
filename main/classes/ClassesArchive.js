import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { withTheme } from "react-native-paper";
import { db } from "../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import ButtonComp from "../../component/mainscreen/ButtonComp";

function ClassesArchive({ theme, navigation }) {
  const [classes, setClasses] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
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
  console.log(classes);
  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <ScrollView>
        <View style={styles.container}>
          {classes.map((d, i) => {
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
                  <View style={{paddingTop:10}}>
                    <View style={{paddingBottom:5}}>
                      <Text>ClassesCurriculum and Theme</Text>
                    </View>
                    <View style={{paddingBottom:5}}>
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
                    <Text>ClassesMaterial:</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        color: "#868889",
                        paddingBottom:5
                      }}
                    >
                      {d.material}
                    </Text>
                    <Text>ClassesSkill Level:</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        color: "#868889",
                        paddingBottom:5
                      }}
                    >
                      {d.skillLevel}
                    </Text>
                    <Text>ClassesNumber of Sessions:</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        color: "#868889",
                        paddingBottom:5
                      }}
                    >
                      {d.numSessions}
                    </Text>
                    <Text>ClassesDuration per session:</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        color: "#868889",
                        paddingBottom:5
                      }}
                    >
                      {d.durationPerSession} hr.
                    </Text>
                    <Text>ClassesPrice:</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 300,
                        color: "#868889",
                        paddingBottom:5
                      }}
                    >
                      {d.price} hr.
                    </Text>
                  </View>
                </View>
                <View>
                  <ButtonComp width={"100%"} btnText="Register" onPress={() => navigation.navigate("Subscriptions")} />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    padding: 10,
    paddingTop: 40,
  },
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

export default withTheme(ClassesArchive);
