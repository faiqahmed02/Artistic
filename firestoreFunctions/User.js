import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  query,
  collection,
  where,
  collectionGroup,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function addUser(userId, formData) {
  await setDoc(doc(db, "users", userId), formData, { merge: true });
  // console.log("Document written with ID: ", docRef.id);
}

export async function getUser(userID) {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    const userData = docSnap.data();
    return userData;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export const getAllurers = async () => {
  const q = query(collection(db, "users"), where("userRole", "==", "Artist"));

  const querySnapshot = await getDocs(q);
  return querySnapshot;

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
};

export const getAllChats = async () => {
  const chatsCollection = collection(db, "chats");
  const querySnapshot = await getDocs(chatsCollection);

  const chats = querySnapshot.docs.map((doc) => {
    return {
      chatId: doc.id,
      data: doc.data(),
    };
  });

  return chats;
};

// // Usage example
// const artistId = "yourArtistId"; // Replace with the actual artist ID


