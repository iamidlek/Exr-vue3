import { initializeApp } from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "invoice-c88a0.firebaseapp.com",
  projectId: "invoice-c88a0",
  storageBucket: "invoice-c88a0.appspot.com",
  messagingSenderId: process.env.VUE_APP_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);

export default app;
