import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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
export const addOrder = async (
  buyerId,
  artId,
  artistId,
  status,
  price,
  orderNumber,
  orderAddress
) => {
  try {
    // Create a new order document
    const orderRef = await addDoc(collection(db, "orders"), {
      buyerId: buyerId,
      artId: artId,
      artistId: artistId,
      orderDate: new Date(),
      orderStatus: status,
      price: price,
      orderNumber: orderNumber,
      orderAddress: orderAddress,
    });

    console.log("Order added with ID: ", orderRef.id);
  } catch (error) {
    console.error("Error adding order: ", error);
  }
};

// Get All Orders by users

export const getAllOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("buyerId", "==", userId));

  const querySnapshot = await getDocs(q);
  return querySnapshot;

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());
  // });
};

export const fetchProducts = async () => {
  try {
    const paintingsCollection = collection(db, "paintings");
    const paintingsSnapshot = await getDocs(paintingsCollection);
    const paintingsData = paintingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return paintingsData;
    // console.log(products);
  } catch (error) {
    console.error("Error fetching paintings:", error);
  }
};

// update Order Status

export const updateOrderStatus = async (orderId, status) => {
  const order = doc(db, "orders", orderId);

  // Set the "capital" field of the city 'DC'
  await updateDoc(order, {
    orderStatus: status,
  });
};

export async function addTrackingId(orderId, formData) {
  await setDoc(doc(db, "orders", orderId), formData, { merge: true });
  // // console.log("Document written with ID: ", docRef.id);
}
