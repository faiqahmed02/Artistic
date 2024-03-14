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
import { auth, db, storage } from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";

// Internal components
import ButtonComp from "../../../component/mainscreen/ButtonComp";
import InputComp from "../../../component/mainscreen/InputComp";
import Filter from "../../../component/mainscreen/Filter";
import {
  artMediumData,
  digitalPanting,
  material,
  schoolsOfArt,
  subject,
  type,
} from "./ProductData";

const AddProduct = ({ theme, navigation }) => {
  // State declarations
  const [artist, setArtist] = useState("");
  const [artWorkName, setArtWorkName] = useState("");
  const [price, setPrice] = useState("");
  const [artWorkType, setArtWorkType] = useState([]);
  const [artMedium, setArtMedium] = useState([]);
  const [artSchool, setArtSchool] = useState([]);
  const [artSubject, setArtSubject] = useState([]);
  const [artMaterial, setArtMaterial] = useState([]);
  const [artPaintingType, setArtPaintingType] = useState([]);
  const [artWorkSize, setArtWorkSize] = useState("");
  const [artWorkWeight, setartWorkWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const user_type = useSelector((state) => state.userType);
  const [loading, setLoading] = useState(false);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

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
      quality: 0.5,
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
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `productImage/${new Date().toISOString()}`
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
    console.log("Start Handle Submit");
    setLoading(true);
    if (!artist || !artWorkName || !price || !artWorkType || !quantity) {
      alert("Please fill all the fields.");
      return;
    }

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated.");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImageAsync();
        console.log(imageUrl);
      }
      const eventRef = collection(db, "paintings");

      // Create a new document with the UID of the authenticated user
      await addDoc(eventRef, {
        artist,
        artWorkName,
        price,
        artWorkType,
        artMedium,
        artSchool,
        artSubject,
        artMaterial,
        artPaintingType,
        artWorkSize,
        artWorkWeight,
        quantity,
        quote,
        description,
        imageUrl,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });

      console.log("Product uploaded successfully!");
      alert("Product submitted successfully!");

      setLoading(false);
      // Clear form
      setArtist("");
      setArtWorkName("");
      setPrice("");
      setArtWorkType("");
      setArtWorkSize("");
      setartWorkWeight("");
      setQuantity(0);
      setQuote("");
      setDescription("");
      setImage(null);

      navigation.navigate("My Products");
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Check the console for details.");
    }

    console.log("End of handleSubmit");
  };

  return (
    <LinearGradient colors={[theme.colors.myOwnColor, "transparent"]}>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={{ padding: 10, paddingTop: 40 }}>
          {/* Input components */}
          <InputComp
            placeholder="Product Title"
            text={artist}
            onChangeText={setArtist}
          />
          <InputComp
            placeholder="Art Work Name"
            text={artWorkName}
            onChangeText={setArtWorkName}
          />
          <InputComp
            placeholder="Price"
            text={price}
            onChangeText={setPrice}
            // inputMode="numeric"
          />
          <InputComp
            placeholder="Quantity"
            text={quantity}
            onChangeText={setQuantity}
            // inputMode="numeric"
          />
          {/* <InputComp
            placeholder="Art Work Type"
            text={artWorkType}
            onChangeText={setArtWorkType}
          /> */}

          <InputComp
            placeholder="Art Work Size"
            text={artWorkSize}
            onChangeText={setArtWorkSize}
            // multiline
          />

          <InputComp
            placeholder="Art Work Weight"
            text={artWorkWeight}
            onChangeText={setartWorkWeight}
            // multiline
          />
          <Filter
            items={artMediumData}
            setSelectedItems={setArtMedium}
            selectedItems={artMedium}
            selectText={"Art Medium"}
          />
          <Filter
            items={schoolsOfArt}
            setSelectedItems={setArtSchool}
            selectedItems={artSchool}
            selectText={"Schools of Art"}
          />
          <Filter
            items={subject}
            setSelectedItems={setArtSubject}
            selectedItems={artSubject}
            selectText={"Art Subject"}
          />
          <Filter
            items={material}
            setSelectedItems={setArtMaterial}
            selectedItems={artMaterial}
            selectText={"Art Material"}
          />
          <Filter
            items={type}
            setSelectedItems={setArtWorkType}
            selectedItems={artWorkType}
            selectText={"Art Work Type"}
          />
          <Filter
            items={digitalPanting}
            setSelectedItems={setArtPaintingType}
            selectedItems={artPaintingType}
            selectText={"Digital Painting/Drawing"}
          />
          <InputComp
            placeholder="Art Story"
            text={quote}
            onChangeText={setQuote}
            multiline
          />
          <InputComp
            placeholder="Art Description"
            text={description}
            onChangeText={setDescription}
            multiline
          />
          {/* Image picker */}
          <TouchableOpacity onPress={() => pickImage()}>
            <Image
              source={require("../../../assets/upload_event.png")}
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

export default withTheme(AddProduct);
