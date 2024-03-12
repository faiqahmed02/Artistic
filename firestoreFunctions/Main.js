import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getEvents() {
  const q = query(collection(db, "events"));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());

  // });
}

export async function getProducts() {
  const q = query(collection(db, "paintings"));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());

  // });
}

// Function to add an order
export const addOrder = async (buyerId, artId, artistId) => {
  try {
    // Create a new order document
    const orderRef = await addDoc(collection(db, "orders"), {
      buyerId: buyerId,
      artId: artId,
      artistId: artistId,
      orderDate: serverTimestamp(),
    });

    console.log("Order added with ID: ", orderRef.id);
  } catch (error) {
    console.error("Error adding order: ", error);
  }
};
