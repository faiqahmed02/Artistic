import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getEvents() {
  const q = query(collection(db, "events"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
