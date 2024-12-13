import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase"; // Importă obiectul auth din firebase.js
import { useNavigate } from "react-router-dom"; // Importă useNavigate pentru redirecționare
import "../../Frontend/Auth/login.css";

// Componentele pentru Login și Register
import LoginForm from "./login";
import RegisterForm from "./register";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Folosim un state pentru a comuta între Login și Register
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Hook pentru navigare

  // Toggle între Login și Register
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(""); // Resetează mesajele de eroare la schimbarea formularului
    setSuccessMessage("");
  };

  // Funcția pentru Login
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Login successful:", userCredential.user);
      setSuccessMessage("Login successful!");
      navigate("/"); // Redirecționează utilizatorul la pagina principală după login
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);
    }
  };
// Funcția pentru Register
  const handleRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registered successfully:", userCredential.user);
      setSuccessMessage("User registered successfully!");

      // După înregistrare, redirecționează utilizatorul la pagina de login
      setTimeout(() => {
        navigate("/auth"); // Redirecționează utilizatorul pe pagina de login
      }, 2000); // Așteaptă 2 secunde înainte de a redirecționa pentru a putea vedea mesajul de succes
    } catch (error) {
      setErrorMessage("Registration failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {isLogin ? (
        <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
      ) : (
        <RegisterForm onRegister={handleRegister} errorMessage={errorMessage} />
      )}

      {successMessage && <p>{successMessage}</p>}

      <p>
        <span
          className="link"
          style={{
            cursor: "pointer",
            color: "rgb(6, 126, 186)",
            textDecoration: "underline",
          }}
          onClick={toggleForm}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;