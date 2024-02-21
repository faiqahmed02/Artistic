// ChatScreen.js
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { withTheme } from "react-native-paper";

const ChatScreen = ({ theme, navigation }) => {
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: "Hello!",
            createdAt: new Date(),
            user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
            },
        },
    ]);

    const onSend = (newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    };

    return (
        <LinearGradient
            style={{ alignItems: "center", padding: 10 }}
            colors={[theme.colors.myOwnColor, "transparent"]}
        >
            <View style={{height: "100%", width:"100%" }}>
                <GiftedChat style={{}} messages={messages} onSend={onSend} user={{ _id: 1 }} />
            </View>
        </LinearGradient>
    );
};

export default withTheme(ChatScreen);
