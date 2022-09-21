import { initializeApp } from "firebase/app";
import {
  getAuth,
  //signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoI7DRFne0hBcPex7zZkFyFOpHCGxSVE4",
  authDomain: "crwn-clothing-c2e9c.firebaseapp.com",
  projectId: "crwn-clothing-c2e9c",
  storageBucket: "crwn-clothing-c2e9c.appspot.com",
  messagingSenderId: "648069209299",
  appId: "1:648069209299:web:668134e4678e7b63c3c826",
};

// Initialize Firebase
//const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);  
  const userSnapshot = await getDoc(userDocRef);  

  //If user does not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};
