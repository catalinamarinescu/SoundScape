<<<<<<< HEAD
// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBka_m7IV7rVHsBwRhlixNBOQkmnCCx_7Y",
//   authDomain: "soundscape-4dc09.firebaseapp.com",
//   databaseURL:
//     "https://soundscape-4dc09-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "soundscape-4dc09",
//   storageBucket: "soundscape-4dc09.firebasestorage.app",
//   messagingSenderId: "602944184199",
//   appId: "1:602944184199:web:97e307dcafd8081f1dbd22",
//   measurementId: "G-N6CG8B4RW2",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// function App() {
//   const [formData, setFormData] = useState({
//     name: "",
//     country: "",
//     lat: "",
//     lng: "",
//   });

//   const [locations, setLocations] = useState([]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add a new location to Firestore
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const locationData = {
//         name: formData.name,
//         country: formData.country,
//         coordinates: {
//           lat: parseFloat(formData.lat),
//           lng: parseFloat(formData.lng),
//         },
//       };
//       await addDoc(collection(db, "locations"), locationData);
//       alert("Location added successfully!");
//       setFormData({ name: "", country: "", lat: "", lng: "" }); // Reset form
//       fetchLocations(); // Refresh locations
//     } catch (error) {
//       console.error("Error adding location: ", error);
//     }
//   };

//   // Fetch locations from Firestore
//   const fetchLocations = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "locations"));
//       const locationsData = [];
//       querySnapshot.forEach((doc) => {
//         locationsData.push({ id: doc.id, ...doc.data() });
//       });
//       setLocations(locationsData);
//     } catch (error) {
//       console.error("Error fetching locations: ", error);
//     }
//   };

//   // Fetch locations on component mount
//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   return (
//     <div>
//       <header>
//         <h1>Soundscape - Discover Music Locations</h1>
//       </header>
//       <main>
//         {/* Form to add a new location */}
//         <section>
//           <h2>Add a New Location</h2>
//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Location Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="country"
//               placeholder="Country"
//               value={formData.country}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="lat"
//               placeholder="Latitude"
//               value={formData.lat}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="lng"
//               placeholder="Longitude"
//               value={formData.lng}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit">Add Location</button>
//           </form>
//         </section>

//         {/* List of locations */}
//         <section>
//           <h2>Locations</h2>
//           {locations.length === 0 ? (
//             <p>No locations added yet.</p>
//           ) : (
//             <ul>
//               {locations.map((location) => (
//                 <li key={location.id}>
//                   {location.name} - {location.country} (Lat:{" "}
//                   {location.coordinates.lat}, Lng: {location.coordinates.lng})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './Backend/Auth/authPage';
import HomePage from './Backend/Auth/home'; // Componenta pentru pagina principală
import { auth } from './Firebase/firebase'; // Firebase Auth
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const [user] = useAuthState(auth); // Verifică dacă utilizatorul este autentificat

  return (
    <Router>
      <Routes>
        {/* Redirecționează utilizatorii neautentificați la pagina de login */}
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        
        {/* Pagina principală doar pentru utilizatorii autentificați */}
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        
        {/* Fallback: redirecționează utilizatorii pe baza stării lor */}
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} />} />
      </Routes>
    </Router>
  );
};

export default App;

=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
>>>>>>> 5b247ea0dfc92f707a037726d7ffe0d8207913f0
