import React from "react";
import { View } from "react-native";
import InputComp from "../../../component/mainscreen/InputComp";
import { useState } from "react";
import { Text } from "react-native";
import ButtonComp from "../../../component/mainscreen/ButtonComp";
import { Button } from "react-native-paper";

function Payment({ formData, setFormData, onPrevious, onNext }) {
  const [field2, setField2] = useState({
    nameOnCard: "",
    cardNumber: "",
    expDate: "",
    CVV: "",
  });

  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = () => {
    setFormData({ ...formData, field2 });
    onNext();
  };

  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <InputComp placeholder="Name on Card" />
      <InputComp placeholder="Card Number" />
      <InputComp placeholder="Expiry Date" />
      <InputComp placeholder="CVV" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={{
            backgroundColor: "#C1272D",
            width: "45%",
            height: 50,
            borderRadius: 0,
            justifyContent: "center",
            margin: "auto",
            color: "white",
            textTransform: "uppercase",
            fontSize: 26,
          }}
          textColor="white"
          onPress={handlePrevious}
        >
          Previous
        </Button>
        <Button
          style={{
            backgroundColor: "#C1272D",
            width: "45%",
            height: 50,
            borderRadius: 0,
            justifyContent: "center",
            margin: "auto",
            color: "white",
            textTransform: "uppercase",
            fontSize: 26,
          }}
          textColor="white"
          onPress={handleSubmit}
        >
          Next
        </Button>
        {/* <ButtonComp />
        <ButtonComp /> */}
      </View>
    </View>
  );
}

export default Payment;
