import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDN4WgMNJsA5-t38FvEi1qLLjLlJz86yzY",
  authDomain: "tally-codebrewers.firebaseapp.com",
  projectId: "tally-codebrewers",
  storageBucket: "tally-codebrewers.appspot.com",
  messagingSenderId: "575296277731",
  appId: "1:575296277731:web:5bd61c991d4b106f0a49d6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
