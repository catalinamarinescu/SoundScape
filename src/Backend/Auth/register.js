import React, { useState } from 'react';
import { auth } from '../../Firebase/firebase'; // Importăm configurarea Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Creăm utilizatorul în Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setMessage('User registered successfully!');
      console.log('User:', userCredential.user);
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-form">
      {/* <h2>Register</h2> */}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
