import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FirebaseProvider } from "./components/context/FirebaseContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </BrowserRouter>
);
