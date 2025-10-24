import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

