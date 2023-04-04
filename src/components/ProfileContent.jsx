import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { loginRequest } from "../authConfig";

export default function ProfileContent({ onTokenChange = () => {} }) {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestAccessToken() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
        onTokenChange(response.accessToken);
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          setAccessToken(response.accessToken);
          onTokenChange(response.accessToken);
        });
      });
  }

  return (
    <>
      {accessToken ? (
        <wired-card>You can call Graph now</wired-card>
      ) : (
        <wired-button elevation="3" onClick={RequestAccessToken}>
          Request Access Token
        </wired-button>
      )}
    </>
  );
}
