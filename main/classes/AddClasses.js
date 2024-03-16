import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import InputComp from "../../component/mainscreen/InputComp";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import { withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const AddClasses = ({ theme, navigation }) => {
  const [details, setDetails] = useState("");
  const [heldBy, setHeldBy] = useState("")
  const [medium, setMedium] = useState("");
  const [material, setMaterial] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [numSessions, setNumSessions] = useState("");
  const [durationPerSession, setDurationPerSession] = useState("");
  const [price, setPrice] = useState("");
  

  const handleSubmit = async () => {
    // Handle form submission logic here
    // console.log("Start Handle Submit");
    if (
      !details ||
      !heldBy||
      !medium ||
      !material ||
      !skillLevel ||
      !numSessions ||
      !durationPerSession ||
      !price
    ) {
      alert("Please fill all the fields.");
      return;
    }
    try {
      const eventRef = collection(db, "classes");

      // Create a new document with the UID of the authenticated user
      await addDoc(eventRef, {
        details,
        heldBy,
        medium,
        material,
        skillLevel,
        numSessions,
        durationPerSession,
        price,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });

      // console.log("Event uploaded successfully!");
      alert("Event submitted successfully!");
      // Clear form
      setDetails("");
      setMedium("");
      setMaterial("");
      setSkillLevel("");
      setNumSessions("");
      setDurationPerSession("");
      setPrice("");

      navigation.navigate("Classes");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console for details.");
    }

    // console.log("End of handleSubmit");
  };

  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.container}>
          <InputComp
            placeholder="Class Details"
            text={details}
            onChangeText={setDetails}
            multiline
          />
           <InputComp
            placeholder="Held By"
            text={heldBy}
            onChangeText={setHeldBy}
            multiline
          />
          <InputComp
            placeholder="Art Medium"
            text={medium}
            onChangeText={setMedium}
          />
          <InputComp
            placeholder="Material"
            value={material}
            onChangeText={setMaterial}
          />
          <InputComp
            placeholder="Skill Level"
            text={skillLevel}
            onChangeText={setSkillLevel}
          />
          <InputComp
            placeholder="Number of Sessions"
            text={numSessions}
            onChangeText={setNumSessions}
            keyboardType="numeric"
          />
          <InputComp
            placeholder="Duration per Session"
            text={durationPerSession}
            onChangeText={setDurationPerSession}
          />
          <InputComp
            placeholder="Price"
            text={price}
            onChangeText={setPrice}
            inputMode="numeric"
          />
          <ButtonComp btnText="Submit" onPress={handleSubmit} width={"100%"} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default withTheme(AddClasses);
