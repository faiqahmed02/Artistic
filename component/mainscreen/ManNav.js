import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ManNav({ theme, onPress, nav, homeNav }) {
  //   const nav = ["Artist", "Gallery", "Followers","Favorites","Online Classes","Events & News","Blogs" ,"Promote With Us"];
  //   const [homeNav, setHomeNav] = useState("Artist")
  const styles = StyleSheet.create({
    link: {
      backgroundColor: theme.colors.linkColor,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
      marginHorizontal: 10,
      marginTop: 15,
    },
    trans: {
      backgroundColor: "transparent",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginHorizontal: 10,
      marginTop: 15,
    },
  });
//   const navChange = (d) => {
//     setHomeNav(d);
//   };
  return (
    <ScrollView horizontal>
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          padding: 10,
        }}
      >
        {nav.map((d, i) => {
          return (
            <TouchableOpacity
              style={homeNav === d ? styles.link : styles.trans}
              key={i}
              onPress={() => onPress(d)}
            >
              <Text
                style={homeNav === d ? { color: "white" } : { color: "black" }}
              >
                {d}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default ManNav;
