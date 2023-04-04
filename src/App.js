import './App.css';
import SignInButton from "./components/SignInButton"
import { useIsAuthenticated } from "@azure/msal-react";
import SignOutButton from './components/SignOutButton';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import ProfileContent from './components/ProfileContent';
import { useState } from 'react';
import { callMsGraph } from './callGraph';
import "wired-elements";

function App() {
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState({});


  const getGraphData = async (accessToken) => {
    const response = await callMsGraph(accessToken);
    setProfile(response);
  }

  return (
    <div className="App">
      <header>
        {
          isAuthenticated ? <SignOutButton /> : <SignInButton />
        }
      </header>
      <main>
        <AuthenticatedTemplate>
          <ProfileContent onTokenChange={setAccessToken}></ProfileContent>
          {

            accessToken ?
              <wired-button onClick={() => getGraphData(accessToken)}>Call Graph</wired-button> :
              <wired-card>Get a token first</wired-card>
          }
          <wired-card elevation="3" className="profile-card">
            <h1>Profile</h1>
            <p>Display Name: {profile.displayName}</p>
          </wired-card>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>You are not signed in! Please sign in.</p>
        </UnauthenticatedTemplate>
      </main>
    </div>
  );
}

export default App;
