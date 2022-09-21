import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase";

const Signin = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);    
  };

  const logGoogleRedictectUser = async () => {
    await signInWithGoogleRedirect();
  };

  useEffect(() => {
    (async () => {
      const response = await getRedirectResult(auth);      
      if (response) {
        await createUserDocumentFromAuth(response.user);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={logGoogleRedictectUser}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default Signin;
