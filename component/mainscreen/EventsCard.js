import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { withTheme } from "react-native-paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

function Loader() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}

function EventsCard({theme}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigation = useNavigation()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();

    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTimeIn24Hours = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Invalid Date";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  if (loading) {
    return <Loader />;
  }

  return events.map((d, i) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: 345,
          maxWidth: "100%",
          height: 194,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
        }}
        key={i}
      >
        <View
          style={{
            width: "50%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#2E2E2E",
              fontSize: 18,
              fontWeight: "400",
              lineHeight: 40,
            }}
          >
            {formatDate(d.date).split(" ")[1]}
          </Text>
          <Text style={{ color: "#C1272D", fontSize: 44, fontWeight: "600" }}>
            {new Date(d.date).getDate()}
          </Text>
          <Text
            style={{
              color: "#1E1E1E",
              fontSize: 12,
              fontWeight: "600",
              lineHeight: 28,
            }}
          >
            {formatDate(d.date).split(" ")[0]}
          </Text>
          <Text
            style={{
              color: "#1E1E1E",
              fontSize: 12,
              fontWeight: "600",
              lineHeight: 28,
            }}
          >
            <FontAwesomeIcon icon={faClock} color={theme.colors.linkColor} />
            {formatTimeIn24Hours(d.time)} PM
          </Text>
          {/* <Text style={{ color: "#1E1E1E", fontSize: 12, fontWeight: "600", lineHeight: 28 }}>
                    Current Time: {currentTime.toLocaleTimeString()}
                  </Text> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Events Details")}
          >
            <Text
              style={{
                color: "#1E1E1E",
                fontSize: 12,
                fontWeight: "600",
                lineHeight: 28,
              }}
            >
              View
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "50%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Use d.imageUrl here if you have an imageUrl property in your event data */}
          <ImageBackground
            source={require("../../assets/event_img.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "left",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "left",
  },
});

export default withTheme(EventsCard);
