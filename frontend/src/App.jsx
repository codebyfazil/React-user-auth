import "./index.css";
import axios from "axios";
import Login from "./auth/login";
import Register from "./auth/signup";
import Dashboard from "./home.jsx/dashboard";
import Logout from "./auth/logout";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

import React, { useState, useEffect } from "react";
import { ModeToggle } from "./components/ui/mode-toggle";
import { ThemeProvider } from "@/components/ui/theme-Provider";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";




function App() {
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [ error ,setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
   const clientId = "993984947083-dsvvdhcf0c9escpp3oaogp7nu3399kmr.apps.googleusercontent.com";
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.log(err);
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <div className="fixed bottom-4 right-4 z-50">
            <ModeToggle />
          </div>
     <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register setUser={setUser} />
            )
          }
        />

        {/* Dashboard route */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Logout route */}
        <Route path="/logout" element={<Logout setUser={setUser}  />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
        </div>
      </ThemeProvider>
      </GoogleOAuthProvider>
  );
}

export default App;
