import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { SnackbarProvider } from "./context/SnackbarContext.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
