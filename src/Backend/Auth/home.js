import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

const HomePage = () => {
  const mapDiv = useRef(null); // Referință pentru div-ul unde se va încărca harta

  // Funcția pentru logout
  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (mapDiv.current) {
      // Creează o hartă folosind ArcGIS WebMap
      const webMap = new WebMap({
        portalItem: {
          id: "e691172598f04ea8881cd2a4adaa45ba", // Exemplu de ID pentru o hartă publică
        },
      });

      // Afișează harta în div-ul specificat
      const mapView = new MapView({
        container: mapDiv.current,
        map: webMap,
      });

      // Curățarea resurselor atunci când componenta se demontează
      return () => {
        if (mapView) {
          mapView.destroy();
        }
      };
    }
  }, []); // Array-ul gol asigură că efectul se execută doar o singură dată la montarea componentei

  return (
    <div>
      <h1>Welcome to the Music Map!</h1>
      
        <button className="button-logout" onClick={handleLogout}>Logout</button>
      

      <div ref={mapDiv} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default HomePage;
