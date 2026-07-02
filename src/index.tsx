import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { SDKProvider } from "./sdk";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <SDKProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SDKProvider>
  </React.StrictMode>
);
