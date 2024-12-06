import React, { useState } from "react";
import { auth } from "../../Firebase/firebase"; // Importăm configurarea Firebase
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Autentificăm utilizatorul în Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setMessage("Login successful!");
      console.log("User:", userCredential.user);
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-form">
      {/* <h2>Login</h2> */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
