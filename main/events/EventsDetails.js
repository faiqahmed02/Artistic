import {
  faCalendar,
  faCalendarAlt,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, withTheme } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function EventsDetails({ theme }) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [tab, setTab] = useState(true);

  const initialCoords = {
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        console.log("Location permission granted");
      } else {
        console.log("Location permission denied");
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTotalSeconds(0);
    setIsActive(false);
  };

  const getHours = () => {
    return Math.floor(totalSeconds / 3600);
  };

  const getMinutes = () => {
    return Math.floor((totalSeconds % 3600) / 60);
  };

  const getSeconds = () => {
    return totalSeconds % 60;
  };

  const TabView = (t) => {
    console.log(t);
    if (t === "Details") {
      setTab(true);
    } else {
      setTab(false);
    }
  };

  return (
    <ScrollView>
      <LinearGradient
        style={{ alignItems: "center" }}
        colors={[theme.colors.myOwnColor, "transparent"]}
      >
        <View style={styles.container}>
          <View
            style={{
              width: 344,
              height: 200,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/eve_det.png")}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  // 48 : 34 : 45
                  color: "white",
                  fontSize: 35,
                  fontWeight: "800",
                  lineHeight: 40,
                }}
              >
                {String(getHours()).padStart(2, "0")}:
                {String(getMinutes()).padStart(2, "0")}:
                {String(getSeconds()).padStart(2, "0")}
              </Text>
            </View>
          </View>
          <View
            style={{ marginTop: 10, display: "flex", flexDirection: "row" }}
          >
            <View style={{ width: "70%" }}>
              <Text style={styles.title}>Artist Meetup</Text>
              <View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View>
                    <Avatar.Image
                      source={require("../../assets/avatart.png")}
                      size={24}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#979797",
                        fontSize: 12,
                        fontWeight: "400",
                        lineHeight: 20,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      Organized by
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        // John Doe
                        color: "black",
                        fontSize: 12,
                        fontWeight: "400",
                        lineHeight: 20,
                      }}
                    >
                      John Doe
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <View
                style={{
                  backgroundColor: theme.colors.linkColor,
                  alignItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  padding: 2,
                }}
              >
                <Text
                  style={{
                    // Dec
                    color: "white",
                    fontSize: 10,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Dec
                </Text>
                <Text
                  style={{
                    // 25
                    color: "white",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  25
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "10%" }}>
              <FontAwesomeIcon icon={faCalendarCheck} size={19} />
            </View>
            <View
              style={{
                width: "90%",
              }}
            >
              <Text
                style={{
                  // Sat, December 25, 2023 at 03:20 PM - Thu, December 30, 2023 at 03:00 PM
                  color: "#1E1F20",
                  fontSize: 10,
                  fontWeight: "400",
                  lineHeight: 16,
                }}
              >
                Sat, December 25, 2023 at 03:20 PM - Thu, December 30, 2023 at
                03:00 PM
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#EEC69B",
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "50%", alignItems: "center" }}>
              <TouchableOpacity onPress={() => TabView("Details")}>
                <Text style={tab === false ? styles.tabTitle : styles.activeDesign}>Details</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "50%", alignItems: "center" }}>
              <TouchableOpacity onPress={() => TabView("Location")}>
                <Text style={tab === true ? styles.tabTitle : styles.activeDesign}>Location</Text>
              </TouchableOpacity>
            </View>
          </View>
          {tab === true ? (
            <View>
              <Text
                style={{
                  color: "#000",
                  fontSize: 14,
                  fontWeight: "400",
                  textTransform: "capitalize",
                  lineHeight: 20,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                nec scelerisque mauris, quis maximus lorem. Pellentesque vitae
                magna sodales mauris sollicitudin pulvinar et id nisi. Praesent
                vitae dui id tellus porttitor rutrum. Etiam consectetur
                efficitur turpis non hendrerit. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos.
                Nulla dui nisi, dictum sed malesuada consectetur, egestas in
                metus. Nam a dictum sem.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Donec nec scelerisque mauris, quis
                maximus lorem. Pellentesque vitae magna sodales mauris
                sollicitudin pulvinar et id nisi. Praesent vitae dui id
              </Text>
            </View>
          ) : (
            <View style={{ paddingTop: 10 }}>
              <MapView style={styles.map} initialRegion={initialCoords}>
                <Marker
                  coordinate={{
                    latitude: initialCoords.latitude,
                    longitude: initialCoords.longitude,
                  }}
                  title={"New York City"}
                  description={"The Big Apple"}
                />
              </MapView>
            </View>
          )}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    heigh: "100%",
    width: "100%",
    alignItems: "left",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "left",
  },
  tabTitle: {
    // Details
    color: "#2E2E2E",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 30,
    width: "100%",
  },
  map: {
    width: 361, // Use window width
    maxWidth:"100%",
    height: 292, // Use window height or a specific height
  },
  activeDesign: {
    color: "#C1272D",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 30,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#C1272D",
  },
});

export default withTheme(EventsDetails);
