import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import InputComp from "../../../component/mainscreen/InputComp";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addUser, getUser } from "../../../firestoreFunctions/User";
import { auth } from "../../../firebaseConfig";

const PersonalDetails = ({ formData, setFormData, onNext, theme }) => {
  const [shipData, setShipData] = useState({});
  useEffect(() => {
    getUser(auth.currentUser.uid).then((res) => {
      // console.log(res);
      if (res.shipping) {
        // console.log(res.shipping);
        setShipData(res.shipping);
        console.log(shipData);
      }
    });
  }, []);
  console.log(shipData.Street_Address);
  const [field1, setField1] = useState({
    Full_Name: auth.currentUser.displayName ? auth.currentUser.displayName : "",
    Street_Address: shipData.Street_Address ? shipData.Street_Address : "",
    Apartment: shipData.Apartment ? shipData.Apartment : "",
    City: shipData.City ? shipData.City : "",
    State: shipData.State ? shipData.State : "",
    Postal_Code: shipData.Postal_Code ? shipData.Postal_Code : "",
    Country: shipData.Country ? shipData.Country : "",
    Email_Address: auth.currentUser.email ? auth.currentUser.email : "",
    Phone_Number: shipData.Phone_Number ? shipData.Phone_Number : "",
  });
  const handleNext = () => {
    if (
      !field1.Full_Name ||
      !field1.Street_Address ||
      !field1.City ||
      !field1.Postal_Code ||
      !field1.Country ||
      !field1.Email_Address
    ) {
      alert("Please fill all the fields.");
      return;
    }

    addUser(auth.currentUser.uid, {
      shipping: field1,
    });
    setFormData({ ...formData, field1 });
    onNext();
  };

  const onChange = (text) => {
    setField1({
      ...field1,
      Full_Name: text,
      Street_Address: text,
      Apartment: text,
      City: text,
      State: text,
      Postal_Code: text,
      Country: text,
      Email_Address: text,
      Phone_Number: text,
    });
    // // console.log(field1);
  };
  // // console.log(field1);
  const inputs = [
    "Full Name",
    "Street Address",
    "Apartment",
    "City",
    "State",
    "Postal Code",
    "Country",
    "Email Address",
    "Phone Number",
  ];

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          margin: 10,
        }}
      >
        {/* <TextInput placeholder="Field 1" onChangeText={setField1} /> */}

        <InputComp
          placeholder="Full Name"
          onChangeText={(text) => setField1({ ...field1, Full_Name: text })}
          text={field1.Full_Name ? field1.Full_Name : ""}
        />
        <InputComp
          placeholder="Street Address"
          onChangeText={(text) =>
            setField1({ ...field1, Street_Address: text })
          }
          text={field1.Street_Address ? field1.Street_Address : ""}
        />
        <InputComp
          placeholder="Apartment"
          onChangeText={(text) => setField1({ ...field1, Apartment: text })}
          text={field1.Apartment}
        />
        <InputComp
          placeholder="City"
          onChangeText={(text) => setField1({ ...field1, City: text })}
          text={field1.City}
        />
        <InputComp
          placeholder="State"
          onChangeText={(text) => setField1({ ...field1, State: text })}
          text={field1.State}
        />
        <InputComp
          placeholder="Postal Code"
          onChangeText={(text) => setField1({ ...field1, Postal_Code: text })}
          text={field1.Postal_Code}
        />
        <InputComp
          placeholder="Country"
          onChangeText={(text) => setField1({ ...field1, Country: text })}
          text={field1.Country}
        />
        <InputComp
          placeholder="Email Address"
          text={field1.Email_Address}
          onChangeText={(text) => setField1({ ...field1, Email_Address: text })}
        />
        <InputComp
          placeholder="Phone Number"
          onChangeText={(text) => setField1({ ...field1, Phone_Number: text })}
          text={field1.Phone_Number}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            onPress={() => handleNext()}
            style={{
              backgroundColor: "#C1272D",
              width: 345,
              maxWidth: "100%",
              height: 50,
              borderRadius: 0,
              justifyContent: "center",
              margin: "auto",
              color: "white",
              textTransform: "uppercase",
              fontSize: 26,
            }}
            textColor="white"
          >
            Next
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PersonalDetails;
