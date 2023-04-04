import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <wired-button elevation="3" onClick={() => handleLogin("redirect")}>
      Sign In
    </wired-button>
  );
};

export default SignInButton;
