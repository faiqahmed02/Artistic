import { doc, setDoc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function addUser(userId, formData) {
  await setDoc(doc(db, "users", userId), formData, { merge: true })
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
