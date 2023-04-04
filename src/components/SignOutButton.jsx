import React from "react";
import { useMsal } from "@azure/msal-react";


/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/", // redirects the top level app after logout
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <wired-button elevation="3" onClick={() => handleLogout("redirect")}>
      Sign Out
    </wired-button>
  );
};

export default SignOutButton;
