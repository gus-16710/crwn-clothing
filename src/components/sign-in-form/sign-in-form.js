import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";
import Button from "../button/button";
import FormInput from "../form-input/form-input";
import "./sign-in-form.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;

        case "auth/user-not-found":
          alert("No user associated with this email");
          break;

        default:
          console.log(error);
          break;
      }
    }
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {    
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label="Email"
          inputOptions={{
            value: email,
            onChange: handleChangeForm,
            type: "text",
            required: true,
            name: "email",
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            value: password,
            onChange: handleChangeForm,
            type: "password",
            required: true,
            name: "password",
          }}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonProps={{ type: "button", onClick: signInWithGoogle }}
            buttonType="google"
          >
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
