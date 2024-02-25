import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import InputComp from "../../../component/mainscreen/InputComp";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PersonalDetails = ({ formData, setFormData, onNext, theme }) => {
  const [field1, setField1] = useState({
    Full_Name: "",
    Street_Address: "",
    Apartment: "",
    City: "",
    State: "",
    Postal_Code: "",
    Country: "",
    Email_Address: "",
    Phone_Number: "",
  });

  const handleNext = () => {
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
    // console.log(field1);
  };
  // console.log(field1);
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
        />
        <InputComp
          placeholder="City"
          onChangeText={(text) => setField1({ ...field1, City: text })}
        />
        <InputComp
          placeholder="State"
          onChangeText={(text) => setField1({ ...field1, State: text })}
        />
        <InputComp
          placeholder="Postal Code"
          onChangeText={(text) => setField1({ ...field1, Postal_Code: text })}
        />
        <InputComp
          placeholder="Country"
          onChangeText={(text) => setField1({ ...field1, Country: text })}
        />
        <InputComp
          placeholder="Email Address"
          onChangeText={(text) => setField1({ ...field1, Email_Address: text })}
        />
        <InputComp
          placeholder="Phone Number"
          onChangeText={(text) => setField1({ ...field1, Phone_Number: text })}
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
