import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getEvents() {
  const q = query(collection(db, "events"));

  const querySnapshot = await getDocs(q);
  return querySnapshot
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());
    

  // });
}

export async function getProducts() {
  const q = query(collection(db, "paintings"));

  const querySnapshot = await getDocs(q);
  return querySnapshot
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());
    

  // });
}
