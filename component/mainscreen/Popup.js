import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";
import ButtonComp from "./ButtonComp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowAltCircleRight, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Popup({ visible, hideModal, textforpopup }) {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: 325,
    maxWidth:"100%",
    height: 219,
    alignSelf: "center",
    alignItems: "center",
  };
  //   <div style={{width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(201, 168, 133, 0.60) 0%, rgba(154, 122, 95, 0.33) 100%)', backdropFilter: 'blur(50px)'}}></div>
  return (
    <Portal>
      {visible === true ? (
        <ImageBackground
          source={require("../../assets/bg_img.png")}
          style={{ height: "100%" }}
        />
      ) : (
        ""
      )}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <FontAwesomeIcon icon={faCheckCircle} color="green" size={60} />
        <Text
          style={{
            color: "#050E37",
            fontSize: 19,
            fontWeight: "400",
            textTransform: "capitalize",
            lineHeight: 24,
            marginBottom:10,
            marginTop:10,
            textAlign:"center"
          }}
        >
          {textforpopup ? textforpopup : "Your Account is successfully created. Please Check your email Address"}
        </Text>
        <ButtonComp width={137} btnText={"OK"} onPress={hideModal} />
      </Modal>
    </Portal>
  );
}

export default Popup;
