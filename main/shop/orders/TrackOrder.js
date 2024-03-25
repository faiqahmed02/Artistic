import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Image, StyleSheet, Text, View } from "react-native";
import InputComp from "../../../component/mainscreen/InputComp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComp from "../../../component/mainscreen/ButtonComp";
import TrackingDetails from "./TrackingData";
import { useRoute } from "@react-navigation/native";
// const token =
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDWFMtVFAiXSwiUGF5bG9hZCI6eyJjbGllbnRJZGVudGl0eSI6eyJjbGllbnRLZXkiOiJsN2MwMzg0ZmMzNzRjODQxMTdiYmRlMDFiY2M4Y2UwZTU4In0sImF1dGhlbnRpY2F0aW9uUmVhbG0iOiJDTUFDIiwiYWRkaXRpb25hbElkZW50aXR5Ijp7InRpbWVTdGFtcCI6IjI1LU1hci0yMDI0IDEyOjEzOjAwIEVTVCIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhcGltb2RlIjoiU2FuZGJveCIsImN4c0lzcyI6Imh0dHBzOi8vY3hzYXV0aHNlcnZlci1zdGFnaW5nLmFwcC5wYWFzLmZlZGV4LmNvbS90b2tlbi9vYXV0aDIifSwicGVyc29uYVR5cGUiOiJEaXJlY3RJbnRlZ3JhdG9yX0IyQiJ9LCJleHAiOjE3MTEzOTAzODAsImp0aSI6IjI1MzExNzY3LTYwNDQtNDAzMy04OTNhLWYzNDM4MWMxZWUzNCJ9.MaTPI98g_TnEWf2QjQyGgHEvTiNlWWRCepv3r1R7VUnte4p_5WRC-BPFcpK0zCVZ6bWvOJBX_-jxjBDTA1m7sr1MSXrwyTPQA0XfwJ5Ni1Ib2uW62RohFFJnGhawHyH3ISHjIsf3pKcA5CANG7FtrkA-gRF6ngOSK0f0xzje542ioUynYg_xarTjZ_D4Kt58yutnoSBVuzXkmKOJ0u0Mqw7RpAL2oShChJGQgWJKTEUQq741IS6uDOZCn_Iu2YZHM3JskKyHM2bJTKJ4ww34Hqxxo84d5mc3-mq2xECR5fo-fmxx2HKlC4LLCMrU8VDxV66mMuOFxKaK-fB3uS8o5jkkkQGw-b3MgCIDUNmLESHSCmqk142NNUgzgtjRF11NmLjpe7Jwv4smspHHBmlvCz9KBSYZENzJ9FOdIBkD0WhaiLb7cnxI_55e1N5lhuryft1F7WkydYOLin7pwM7Spi-tLWVmctQusB4STyCWcdDSWGYp46y2LowI7u71mbxb59t3nkkeneHtdUte27Jmp3tK56CNbmtjgo3lAWtgm1fGHIrVCCHjGn0FgBduMyPKE1ZC7v5r4vs6TulKk4GiwXzJdS7pWmc6gIenHR4ePQaU8_z_l44H3HQSTXTw43wOeOyFnfkniVT9Z19-xRDzn4qKUCnhd231IWPWx6kdXrA";
function TrackOrder({ theme, navigation }) {
  const route = useRoute();
  const { trackId } = route.params;
  const [trackingNumber, setTrackingNumber] = useState("");
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  console.log(trackingNumber);

  const getToken = async () => {
   
    await axios
      .post(
        process.env.EXPO_PUBLIC_FADX_TOKEN_URL,
        {
          grant_type: "client_credentials",
          client_id: process.env.EXPO_PUBLIC_FADX_TRACK_API_KEY,
          client_secret: process.env.EXPO_PUBLIC_FADX_TRACK_SECRET_KEY,
        },
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      )
      .then(async function (response) {
        console.log(response.data.access_token);
        // setTrackingNumber(trackId)
        setToken(response.data.access_token);

        // const storeData = async (value) => {
      })
      .catch(function (error) {
        console.log(error);
        // return error;
      });
  };

  const fetchTrackingDetails = async (token_added) => {
    await axios
      .post(
        process.env.EXPO_PUBLIC_FADX_TRACK_URL,
        {
          trackingInfo: [
            {
              trackingNumberInfo: {
                trackingNumber: "794843185271",
              },
            },
          ],
          includeDetailedScans: true,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token_added}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.output.completeTrackResults[0].trackResults[0]);
        setData(res.data.output);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <LinearGradient
      style={{ alignItems: "center", flex: 1 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <ScrollView style={{ padding: 10 }}>
        <View>
          <Image source={require("../../../assets/logo.png")} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 13.5,
              lineHeight: 44,
              fontWeight: "400",
            }}
          >
            Track Your Order
          </Text>
        </View>
        <View>
          <InputComp
            placeholder={"Enter Tracking Number"}
            text={trackingNumber ? trackingNumber : trackId}
            onChangeText={(text) => setTrackingNumber(text)}
            inputMode="numeric"
          />
          <ButtonComp
            btnText={"Track Order"}
            onPress={() => fetchTrackingDetails(token)}
          />
        </View>
        {data ? (
          <TrackingDetails
            trackingData={data}
            trackingNumber={trackingNumber}
          />
        ) : (
          ""
        )}
      </ScrollView>
    </LinearGradient>
  );
}

export default withTheme(TrackOrder);
