import React from 'react'
import { View } from 'react-native'
import Payment from '../shop/checkoutComp/Payment'
import InputComp from '../../component/mainscreen/InputComp'
import { Button, withTheme } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { auth } from '../../firebaseConfig'

function SubNow({ theme, navigation }) {
    React.useEffect(() => {
      if(!auth.currentUser){
        navigation.navigate("Login")
      }
    }, [])
    
    return (
        <LinearGradient style={{ alignItems: "center" }}
            colors={[theme.colors.myOwnColor, "transparent"]}>
            <View style={{width:"100%", padding:10, marginTop:20}}>
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
                            width:"100%"
                        }}
                        textColor="white"
                    onPress={() => navigation.navigate("Thank You")}
                    >
                        Pay
                    </Button>
                </View>
            </View>
        </LinearGradient>
    )
}

export default withTheme(SubNow)