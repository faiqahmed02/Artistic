import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function addUser(userId, formData) {
  await setDoc(doc(db, "users", userId), formData);
}
