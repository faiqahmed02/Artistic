import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
import ButtonComp from '../../component/mainscreen/ButtonComp';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../firebaseConfig';

function Subscription({ theme, navigation }) {
    return (
        <LinearGradient
            style={{ alignItems: "center"}}
            colors={[theme.colors.myOwnColor, "transparent"]}
        >
            <ScrollView style={{padding: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.card}>
                    <View style={styles.card_content}>
                        <TouchableOpacity style={{ marginVertical: 10 }}>
                            <Text style={{ width: 30 }}>
                                <FontAwesomeIcon icon={faCheck} />
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>Buyer Monthly</Text>
                        <View style={{ flexDirection: 'row', alignItems: "baseline" }}>
                            <Text style={{ fontSize: 50, fontWeight: "700" }}>$7</Text>
                            <Text>/per month</Text>
                        </View>
                        <Text style={{ marginTop: 30 }}>Lorem Ipsum Subscription Details Here</Text>

                    </View>
                    <ButtonComp btnText="Subscribe" onPress={() => navigation.navigate("Pay Now")} width={341} />
                </View>
            </View>
            </ScrollView>
        </LinearGradient>
    )
}

export default withTheme(Subscription)

const styles = StyleSheet.create({
    card: {
        width: 341,
        // height:253,
        // maxHeight:"100%",
        maxWidth: "100%",
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 20,



    },
    card_content: {
        backgroundColor: "white",
        height: 208,
        borderTopRightRadius: 50,
        padding: 20,
        margin: 'auto'
    }
})