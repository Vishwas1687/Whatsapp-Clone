import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZERr_WFBhFUb7kI9kamawz6rkchjQUAk",
  authDomain: "whatsapp-clone-ccfe8.firebaseapp.com",
  projectId: "whatsapp-clone-ccfe8",
  storageBucket: "whatsapp-clone-ccfe8.firebasestorage.app",
  messagingSenderId: "540044074532",
  appId: "1:540044074532:web:7a7d15e213e058696382b1",
  measurementId: "G-C72JYQZHEN",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
