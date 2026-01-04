import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB8CTCmnbObpTLpAiwdg_gn5_8-ZUTbM94",
  authDomain: "careerai-1ba40.firebaseapp.com",
  projectId: "careerai-1ba40",
  storageBucket: "careerai-1ba40.firebasestorage.app",
  messagingSenderId: "1019326785506",
  appId: "1:1019326785506:web:bd577a469c7e02ba9ebbbb"
};

const app = initializeApp(firebaseConfig);

// 🔥 export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export default app;
