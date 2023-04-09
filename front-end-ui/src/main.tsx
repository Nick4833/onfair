import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Layout from "./components/layout";
import { Root } from "react-dom/client";
import { createBrowserRouter, Navigate, redirect, RouterProvider, useNavigate } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Fairs from "./pages/fairs";
import AuthProvider from "./context/AuthContext"

const test = false;



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);
