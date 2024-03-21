import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import InputComp from "../../../component/mainscreen/InputComp";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addUser, getUser } from "../../../firestoreFunctions/User";
import { auth } from "../../../firebaseConfig";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PersonalDetails = ({ formData, setFormData, onNext, theme }) => {
  const [field1, setField1] = useState({
    Full_Name: auth.currentUser.displayName ? auth.currentUser.displayName : "",
    Street_Address: "",
    Apartment: "",
    City: "",
    State: "",
    Postal_Code: "",
    Country: "",
    Email_Address: auth.currentUser.email ? auth.currentUser.email : "",
    Phone_Number: "",
  });
  const [shipData, setShipData] = useState({});
  const [token, setToken] = useState(null);
  const [resolved, setResolved] = useState(false);
  const genrateFadexToken = async () => {
    await axios
      .post(
        process.env.EXPO_PUBLIC_FADX_TOKEN_URL,
        {
          grant_type: "client_credentials",
          client_id: process.env.EXPO_PUBLIC_FADX_API_KEY,
          client_secret: process.env.EXPO_PUBLIC_FADX_SECRET_KEY,
        },
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then(async function (response) {
        // console.log(response)
        // const storeData = async (value) => {
        try {
          await AsyncStorage.setItem("FadexAuth", response.data.access_token);
          setToken(response.data.access_token);
        } catch (e) {
          // saving error
          setToken(null);
          alert(e);
        }

        // };
      })
      .catch(function (error) {
        console.log(error);
        // return error;
      });
    return token;
  };

  const addressValidationFadX = async () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const day = String(currentDate.getDate()).padStart(2, "0");

    const justDate = `${year}-${month}-${day}`;

    console.log(justDate); // Output will be in the format "YYYY-MM-DD"

    const data = {
      inEffectAsOfTimestamp: "2019-09-06",
      validateAddressControlParameters: {
        includeResolutionTokens: true,
      },
      addressesToValidate: [
        {
          address: {
            streetLines: [field1.Street_Address],
            city: field1.City,
            stateOrProvinceCode: field1.State,
            postalCode: field1.Postal_Code,
            countryCode: field1.Country,
          },
          clientReferenceId: "None",
        },
      ],
    };
    // let resolved;
    await axios
      .post(process.env.EXPO_PUBLIC_FADX_ADDRESS_RESOLVE_URL, data, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.output.resolvedAddresses);
        const resolvedAddressAttributes = res.data.output.resolvedAddresses.map(
          (address) => address.attributes
        );

        // console.log(resolvedAddressAttributes[0].Resolved);
        setResolved(resolvedAddressAttributes[0].Resolved);
        console.log(resolved);
        // return ;
        // return resolved;
      })
      .catch((err) => {
        console.log(err);
        setResolved(false);
        console.log(resolved);
        // return err;
      });
  };

  useEffect(() => {
    if (!shipData) {
      getUser(auth.currentUser.uid).then((res) => {
        // console.log(res);
        if (res.shipping) {
          // console.log(res.shipping);
          setShipData(res.shipping);
          console.log(shipData);
        }
      });
    }
  }, [auth.currentUser.uid]);
  // console.log(shipData.Street_Address);

  const handleNext = async () => {
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
    // console.log(token)
    // if (token) {
    await genrateFadexToken()
      .then(async (res) => {
        console.log(token);
        await addressValidationFadX();
      })
      .catch((err) => {
        alert(err);
      });
    // }

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
  console.log(token);

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
        {/* <DropDown /> */}
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
