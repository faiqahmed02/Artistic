// ChatScreen.js

import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getUser } from "../../firestoreFunctions/User";

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  //   const { '3ojPhMKO7xOKjUcRGId4ztQ2Sl42' } = route.params;

  useEffect(() => {
    const userId = auth.currentUser.uid;

    // Query to get messages from both the user and the artist
    const q = query(
      collection(
        db,
        "chats",
        userId,
        "conversations",
        '3ojPhMKO7xOKjUcRGId4ztQ2Sl42',
        "messages"
      ),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
          },
        };
      });

      setMessages(newMessages);
    });

    // Assuming you have a function to get artist details by ID
    getUser("3ojPhMKO7xOKjUcRGId4ztQ2Sl42")
      .then((res) => {
        setOtherUser(res);
      })
      .catch((err) => {
        alert("Artist not found");
      });

    return () => unsubscribe();
  }, [route.params]);

  const onSend = async (newMessages = []) => {
    try {
      const userId = auth.currentUser.uid;

      const docRef = await addDoc(
        collection(
          db,
          "chats",
          userId,
          "conversations",
          '3ojPhMKO7xOKjUcRGId4ztQ2Sl42',
          "messages"
        ),
        {
          text: newMessages[0].text,
          createdAt: serverTimestamp(),
          user: newMessages[0].user,
        }
      );

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
      }}
    />
  );
};

export default ChatScreen;
