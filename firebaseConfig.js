// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFbpFEOMeE0BBt6ExxZEUS_DSzM8Ao1HE",
  authDomain: "zicoart-173b5.firebaseapp.com",
  projectId: "zicoart-173b5",
  storageBucket: "zicoart-173b5.appspot.com",
  messagingSenderId: "919794637718",
  appId: "1:919794637718:web:3b0b1a622bf2dd9e2bdbb7",
  measurementId: "G-ZDMH4QG41W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app)

// export db2 -= firebase

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export const functions = getFunctions(app);