import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./service/AuthContext";
import { CookiesProvider } from "react-cookie";

const root = document.getElementById('root');

if (root !== null) {
  createRoot(root).render(
    <Router>
      <React.StrictMode>
        <AuthProvider>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </AuthProvider>
      </React.StrictMode>
    </Router>
  );
}