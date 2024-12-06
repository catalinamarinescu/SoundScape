import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase'; // Importă obiectul auth din firebase.js
import '../../Frontend/Auth/login.css';

// Componentele pentru Login și Register
import LoginForm from './login';
import RegisterForm from './register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Folosim un state pentru a comuta între Login și Register
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Toggle între Login și Register
  const toggleForm = () => {
    setIsLogin(!isLogin); 
    setErrorMessage(''); // Resetează mesajele de eroare la schimbarea formularului
    setSuccessMessage('');
  };

  // Funcția pentru Login
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      setSuccessMessage('Login successful!');
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  // Funcția pentru Register
  const handleRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registered successfully:', userCredential.user);
      setSuccessMessage('User registered successfully!');
    } catch (error) {
      setErrorMessage('Registration failed: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      {isLogin ? (
        <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
      ) : (
        <RegisterForm onRegister={handleRegister} errorMessage={errorMessage} />
      )}

      {successMessage && <p>{successMessage}</p>}
      {/* <span className="link">
        <button onClick={toggleForm}>
            {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
        </button>
      </span> */}

        <p>
        <span
            className="link"
            style={{ cursor: "pointer", color: 'white', textDecoration: "underline" }}
            onClick={toggleForm}
        >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </span>
        </p>

      
    </div>
  );
};

export default AuthPage;