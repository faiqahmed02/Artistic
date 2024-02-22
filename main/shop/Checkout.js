// MultiStepForm.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, Dimensions } from "react-native";
import PersonalDetails from "./checkoutComp/PersonalDetails";
import { withTheme } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import Payment from "./checkoutComp/Payment";
import Summary from "./checkoutComp/Summary";

const Step2 = ({ formData, setFormData, onPrevious, onSubmit }) => {};

const Checkout = ({ theme, navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const onNext = () => {
    setStep(step + 1);
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const onSubmit = () => {
    // Submit form data or perform necessary actions
    setTimeout(() => {
      navigation.navigate("Thank You")
    }, 1000);
    // console.log("Form submitted:", formData);
  };
  const steps = [
    { title: "Address" },
    { title: "Payment" },
    { title: "Summary" },
    // Add more steps as needed
  ];
  const handleCancel = () => {
    setFormData({});
    setTimeout(() => {
      navigation.navigate("Cart");
    }, 1000);
    // console.log(formData);
  };
  return (
    <LinearGradient
      style={{ alignItems: "center" }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
            width: Dimensions.get("window").width,
            // backgroundColor:"black",
            // marginHorizontal:20
            padding: 10,
          }}
        >
          {steps.map((s, index) => (
            <View key={index} style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.colors.linkColor,
                }}
              >
                <Text style={{ color: theme.colors.linkColor }}>
                  {index + 1 <= step ? (
                    <FontAwesomeIcon
                      icon={faDotCircle}
                      color={theme.colors.linkColor}
                    />
                  ) : (
                    ""
                  )}
                </Text>
              </View>
              <Text>{s.title}</Text>
            </View>
          ))}
        </View>
        {step === 1 && (
          <PersonalDetails
            formData={formData}
            setFormData={setFormData}
            onNext={onNext}
            theme={theme}
          />
        )}
        {step === 2 && (
           <Summary
           formData={formData}
           setFormData={setFormData}
           onPrevious={onPrevious}
           onSubmit={onSubmit}
           theme={theme}
           handleCancel={handleCancel}
         />
        )}
        {/* {step === 3 && (
       
        )} */}
      </View>
    </LinearGradient>
  );
};

export default withTheme(Checkout);
