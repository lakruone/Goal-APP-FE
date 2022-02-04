import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <Auth0Provider
        domain="dev-t3uksfcn.us.auth0.com"
        clientId="LKNTZrSk3w3yhrKPeX3qW6pu8zkact60"
        redirectUri={window.location.origin}
    >
        <App />
    </Auth0Provider>, 
    document.getElementById("root")
);
