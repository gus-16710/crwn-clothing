import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import Button from "../button/button";
import FormInput from "../form-input/form-input";

import "./sign-up-form.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmitForm = async (event) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }

      console.log(error);
    }
  };

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label="Display Name"
          inputOptions={{
            value: displayName,
            onChange: handleChangeForm,
            type: "text",
            required: true,
            name: "displayName",
          }}
        />

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

        <FormInput
          label="Confirm Password"
          inputOptions={{
            value: confirmPassword,
            onChange: handleChangeForm,
            type: "password",
            required: true,
            name: "confirmPassword",
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
