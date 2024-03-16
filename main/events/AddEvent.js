// Import statements
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import { useSelector } from "react-redux";

// Internal components
import ButtonComp from "../../component/mainscreen/ButtonComp";
import InputComp from "../../component/mainscreen/InputComp";

const EventSubmissionForm = ({ theme, navigation }) => {
  // State declarations
  const [title, setTitle] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const user_type = useSelector((state) => state.userType);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  // Image pick function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
      // console.log(image);
    }
  };
  // console.log(image);
  // Image upload function
  const uploadImageAsync = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `eventImages/${new Date().toISOString()}`
      );
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  // Form submission function
  const handleSubmit = async () => {
    // console.log("Start Handle Submit");
    if (!title || !organizerName || !date || !time || !details) {
      alert("Please fill all the fields.");
      return;
    }

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    let imageUrl = "";
    // if (image) {
    //   imageUrl = await uploadImageAsync(image);
    //   // console.log(image);
    // }

    try {
      const eventRef = collection(db, "events");

      // Create a new document with the UID of the authenticated user
      await addDoc(eventRef, {
        title,
        organizerName,
        date,
        time,
        details,
        imageUrl,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });

      // console.log("Event uploaded successfully!");
      alert("Event submitted successfully!");

      setLoading(false);
      // Clear form
      setTitle("");
      setOrganizerName("");
      setDate("");
      setTime("");
      setDetails("");
      setImage(null);

      navigation.navigate("Events");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console for details.");
    }

    // console.log("End of handleSubmit");
  };

  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ padding: 10, paddingTop: 40 }}>
          {/* Input components */}
          <InputComp
            placeholder="Event Title"
            text={title}
            onChangeText={setTitle}
          />
          <InputComp
            placeholder="Organizer Name"
            text={organizerName}
            onChangeText={setOrganizerName}
          />
          <InputComp
            placeholder="Event Date (YYYY-MM-DD)"
            text={date}
            onChangeText={setDate}
          />
          <InputComp
            placeholder="Event Time (HH:MM)"
            text={time}
            onChangeText={setTime}
          />
          <InputComp
            placeholder="Event Details"
            text={details}
            onChangeText={setDetails}
            multiline
          />
          {/* Image picker */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={require("../../assets/upload_event.png")}
              style={{ width: "100%", borderRadius: 10, paddingVertical: 10 }}
            />
          </TouchableOpacity>
          {/* {image && alert("Image Uploaded")} */}
          {/* Submit button */}
          <ButtonComp
            btnText="Submit Event"
            onPress={() => handleSubmit()}
            width={"100%"}
            disabled={loading ? true : false}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default withTheme(EventSubmissionForm);
