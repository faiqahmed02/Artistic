// EventSubmissionForm.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import ButtonComp from "../../component/mainscreen/ButtonComp";
import InputComp from "../../component/mainscreen/InputComp";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import { getUser } from "../../firestoreFunctions/User";
import { useSelector } from "react-redux";

const EventSubmissionForm = ({ theme, navigation }) => {
  const [title, setTitle] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const user_type = useSelector((state) => state.userType);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets);
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageAsync = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `eventImages/${new Date().toISOString()}`);
    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  };

  const handleSubmit = async () => {
    if (!title || !organizerName || !date || !time || !details) {
      alert("Please fill all the fields.");
      return;
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageAsync(image);
      console.log(image);
    }

    try {
      await addDoc(collection(db, "events"), {
        title,
        organizerName,
        date,
        time,
        details,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Event submitted successfully!");
      // Clear form
      setTitle("");
      setOrganizerName("");
      setDate("");
      setTime("");
      setDetails("");
      setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong while submitting the event.");
    }
  };

  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <View style={{ padding: 10, paddingTop: 40 }}>
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
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={require("../../assets/upload_event.png")}
            style={{ width: "100%", borderRadius: 10, paddingVertical: 10 }}
          />
        </TouchableOpacity>
        {image && alert("Image Uploaded")}
        <ButtonComp
          btnText="Submit Event"
          onPress={() => handleSubmit()}
          width={"100%"}
        />
      </View>
    </LinearGradient>
  );
};

export default withTheme(EventSubmissionForm);
