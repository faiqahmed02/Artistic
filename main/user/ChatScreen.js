import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"; // Import your Firebase configuration
import { withTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const ChatScreen = ({ route, theme, navigation }) => {
  const { artistId, userId, artistName } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatRoomId = getChatRoomId(artistId, userId);

    const q = query(
      collection(db, "chats", chatRoomId, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };
      });
      setMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [artistId, userId]);

  const onSend = async (newMessages = []) => {
    const chatRoomId = getChatRoomId(artistId, userId);
    const chatRoomRef = doc(db, "chats", chatRoomId); // Define the chat room reference

    await setDoc(chatRoomRef, {
      members: [artistId, userId],
      createdAt: new Date(),
    });
    newMessages.forEach(async (message) => {
      await addDoc(collection(db, "chats", chatRoomId, "messages"), {
        text: message.text,
        createdAt: new Date(),
        user: message.user,
      });
    });
  };

  return (
    <LinearGradient
      style={{ padding: 10, flex: 1 }}
      colors={[theme.colors.myOwnColor, "transparent"]}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userId,
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
        }}
        renderUsernameOnMessage
        showUserAvatar
        alwaysShowSend
        renderAvatarOnTop
        placeholder="Type your message here..."
        inverted={true}
      />
    </LinearGradient>
  );
};

const getChatRoomId = (artistId, userId) => {
  return artistId > userId ? `${artistId}-${userId}` : `${userId}-${artistId}`;
};

export default withTheme(ChatScreen);
