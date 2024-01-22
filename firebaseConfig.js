// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9EIWPug3OCUEvmLYujmzh4foIz6N0Xhs",
  authDomain: "zico-art.firebaseapp.com",
  projectId: "zico-art",
  storageBucket: "zico-art.appspot.com",
  messagingSenderId: "712865169723",
  appId: "1:712865169723:web:8c87001971c8ceef6cb71e",
  measurementId: "G-9VG0Y64SRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})