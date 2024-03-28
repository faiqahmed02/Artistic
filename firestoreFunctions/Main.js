import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Linking, Share } from "react-native";

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

// Share Functions
export const onShare = async () => {
  try {
    const result = await Share.share({
      title: "App link",
      message:
        "Please install this app and stay safe , AppLink :https://play.google.com/store/apps",
      url: "https://play.google.com/store/apps",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const openURL = (url) => {
  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

// Function to add a followed ID for a follower
export const addFollower = async (followerId, followedId) => {
  try {
    // Add the followed ID to the subcollection
    await addDoc(collection(db, "followers", followerId, "followedIds"), {
      followedId,
      createdAt: new Date(),
    });

    console.log("Followed ID added for follower: ", followerId);
  } catch (error) {
    console.error("Error adding followed ID: ", error);
  }
};

//
//
// Function to follow a user
export async function followUser(userId, followerId) {
  const followerRef = doc(db, `users/${userId}/followers/${followerId}`);
  try {
    await setDoc(followerRef, {
      followerId: followerId,
      timestamp: serverTimestamp(),
    });
    console.log("User followed successfully!");
  } catch (error) {
    console.error("Error following user:", error);
  }
}

// Function to unfollow a user
async function unfollowUser(userId, followerId) {
  const followerRef = doc(db, `users/${userId}/followers/${followerId}`);
  try {
    await deleteDoc(followerRef);
    console.log("User unfollowed successfully!");
  } catch (error) {
    console.error("Error unfollowing user:", error);
  }
}

// Function to get followers of a user
export async function getFollowers(userId) {
  const followersCollection = collection(db, `users/${userId}/followers`);
  try {
    let artistIds = [];
    const querySnapshot = await getDocs(followersCollection);
    querySnapshot.forEach((doc) => {
      const followerData = doc.id;
      console.log(followerData);
      artistIds.push(followerData);
    });
    return artistIds;
  } catch (error) {
    console.error("Error getting followers:", error);
  }
}
