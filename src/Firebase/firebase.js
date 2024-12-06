// Importăm SDK-ul Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configurația proiectului Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDoa9CpV3YBq7GObTpveSRjEnVa7tFZZbA",
    authDomain: "soundscape-31f0d.firebaseapp.com",
    projectId: "soundscape-31f0d",
    storageBucket: "soundscape-31f0d.firebasestorage.app",
    messagingSenderId: "1019880944988",
    appId: "1:1019880944988:web:98f21e7106c22afb53fd99",
    measurementId: "G-7M85128MPB"
};

// Inițializăm Firebase
const app = initializeApp(firebaseConfig);

// Exportăm serviciul de autentificare
export const auth = getAuth(app);
