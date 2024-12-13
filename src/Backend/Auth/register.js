// import React, { useState } from 'react';
// import { auth } from '../../Firebase/firebase'; // Importăm configurarea Firebase
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const RegisterForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       // Creăm utilizatorul în Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       setMessage('User registered successfully!');
//       console.log('User:', userCredential.user);
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div className="auth-form">
//       {/* <h2>Register</h2> */}
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default RegisterForm;


import React, { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase";
import "../../Frontend/Auth/login.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // Nou: urmărește procesarea
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsProcessing(true); // Blochează procesarea multiplă

    try {
      // Înregistrează utilizatorul
      await createUserWithEmailAndPassword(auth, email, password);

      // Deconectează utilizatorul imediat după înregistrare
      await signOut(auth);

      // Mesaj de succes și redirecționare către login
      setSuccessMessage("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Afișează mesajul de succes timp de 1 sec.
    } catch (error) {
      setErrorMessage("Registration failed: " + error.message);
    } finally {
      setIsProcessing(false); // Permite alte încercări
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isProcessing} // Dezactivează input-urile în timpul procesării
        />
<input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isProcessing} // Dezactivează input-urile în timpul procesării
        />
        <button type="submit" disabled={isProcessing}> {/* Dezactivează butonul */}
          {isProcessing ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;