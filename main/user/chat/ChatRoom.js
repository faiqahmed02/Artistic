import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { serverTimestamp, doc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-paper";
// import { useFirestore } from 'reactfire';

const ChatRoom = ({ route, theme }) => {
  const { chatRoomId } = route.params;
  const [messages, setMessages] = useState([]);
  //   const firestore = useFirestore();

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatRoomId, "messages"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };
      });
      setMessages(messagesData);
    });

    return () => {
      unsubscribe();
    };
  }, [chatRoomId]);

  const onSend = async (newMessages = []) => {
    const chatRoomRef = doc(db, "chats", chatRoomId);

    await Promise.all(
      newMessages.map(async (message) => {
        await addDoc(collection(db, "chats", chatRoomId, "messages"), {
          text: message.text,
          createdAt: new Date(),
          user: message.user,
        });
      })
    );

    // // Update last message timestamp in the chat room document
    // await Promise.all([
    //   addDoc(collection(db, 'chats', chatRoomId, 'messages'), {
    //     text: newMessages[0].text,
    //     createdAt: new Date(),
    //     user: newMessages[0].user,
    //   }),
    //   setLastMessageTimestamp(chatRoomRef),
    // ]);
  };

  const setLastMessageTimestamp = async (chatRoomRef) => {
    await addDoc(collection(db, "chats"), {
      lastMessageTimestamp: serverTimestamp(),
    });
  };

  return (
    <LinearGradient
      colors={[theme.colors.myOwnColor, "transparent"]}
      style={{ flex: 1 }}
    >
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          avatar: auth.currentUser.photoURL,
        }} // Replace with your user ID retrieval logic
      />
    </LinearGradient>
  );
};

export default withTheme(ChatRoom);
