// import React, { useEffect, useRef, useState } from "react";
// import MapView from "@arcgis/core/views/MapView";
// import WebMap from "@arcgis/core/WebMap";
// import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
// import Search from "@arcgis/core/widgets/Search";
// import { signOut } from "firebase/auth";
// import { auth } from "../../Firebase/firebase";

// const API_KEY = "AIzaSyAizL1hy46uvxpUSlF3DPi2f75fPfeZuMo";

// const HomePage = () => {
//   const mapDiv = useRef(null);
//   const [geoJSONLayer, setGeoJSONLayer] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleLogout = () => {
//     signOut(auth);
//   };

//   const fetchLocations = async () => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/textsearch/json?query=music+venues&location=48.8566,2.3522&radius=10000&key=${API_KEY}`
//       );
//       const data = await response.json();
//       return data.results;
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//       return [];
//     }
//   };

//   const convertToGeoJSON = (locations) => ({
//     type: "FeatureCollection",
//     features: locations.map((location) => ({
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [
//           location.geometry.location.lng,
//           location.geometry.location.lat,
//         ],
//       },
//       properties: {
//         Name: location.name,
//         Address: location.formatted_address,
//       },
//     })),
//   });

//   useEffect(() => {
//     let mapView;
  
//     if (mapDiv.current) {
//       // Inițializează WebMap
//       const webMap = new WebMap({
//         portalItem: {
//           id: "338350419fdb4d5b9363ae8d91182416", // ID-ul hărții tale
//         },
//       });
  
//       // Inițializează MapView
//       mapView = new MapView({
//         container: mapDiv.current, // Elementul DOM pentru hartă
//         map: webMap,
//         zoom: 12, // Nivelul de zoom
//         center: [2.3522, 48.8566], // Coordonatele de centru (Paris)
//       });
  
//       // Adaugă widget-ul Search
//       mapView.when(() => {
//         const searchWidget = new Search({
//           view: mapView, // Leagă widget-ul de MapView
//         });
  
//         // Adaugă widget-ul în interfața hărții (colțul din dreapta sus)
//         mapView.ui.add(searchWidget, {
//           position: "top-right",
//         });
//       });
//     }
  
//     return () => {
//       if (mapView) {
//         mapView.destroy(); // Curăță resursele la demontare
//       }
//     };
//   }, []);
  
//   return (
//     <div>
//       <h1>Welcome to the Music Map!</h1>
//       <button className="button-logout" onClick={handleLogout}>
//         Logout
//       </button>
//       <div ref={mapDiv} style={{ height: "500px", width: "100%" }}></div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import '../../Frontend/home.css'; // Vei adăuga stiluri personalizate pentru HomePage

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Funcție pentru a comuta starea meniului (a-l deschide sau închide)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Funcția pentru logout
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="home-page">
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Meniul lateral */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={() => navigate('/map')} className="sidebar-button">
          Harta
        </button>
        <button onClick={handleLogout} className="sidebar-button">
          Logout
        </button>
      </div>

      <div className="content">
        <h1>Welcome to SoundScape!</h1>
        <p>Aici va apărea conținutul paginii tale de home.</p>
      </div>
    </div>
  );
};

export default HomePage;
