// import React, { useEffect, useRef } from "react";
// import "@arcgis/core/assets/esri/themes/light/main.css";
// import Map from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
// import Graphic from "@arcgis/core/Graphic";
// import Locator from "@arcgis/core/tasks/Locator";
// import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";

// const MusicMap = () => {
//   const mapDiv = useRef(null);

//   useEffect(() => {
//     const map = new Map({
//       basemap: "streets-navigation-vector",
//     });

//     const view = new MapView({
//       container: mapDiv.current,
//       map: map,
//       center: [-0.1276, 51.5072], // Londra (exemplu)
//       zoom: 12,
//     });

//     const musicPlaces = [
//       "Choose a music place type...",
//       "Recording Studios",
//       "Concert Venues",
//       "Record Labels",
//       "Events",
//     ];

//     const select = document.createElement("select");
//     select.setAttribute("class", "esri-widget esri-select");
//     select.setAttribute(
//       "style",
//       "width: 200px; font-family: 'Avenir Next W00'; font-size: 1em"
//     );

//     musicPlaces.forEach((place) => {
//       const option = document.createElement("option");
//       option.value = place;
//       option.innerHTML = place;
//       select.appendChild(option);
//     });

//     view.ui.add(select, "top-right");

//     const locatorUrl =
//       "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

//     const findPlaces = (category, pt) => {
//       if (category === "Choose a music place type...") return;

//       const locator = new Locator({ url: locatorUrl });

//       locator
//         .addressToLocations(locatorUrl, {
//           location: pt,
//           categories: [category],
//           maxLocations: 25,
//           outFields: ["Place_addr", "PlaceName"],
//         })
//         .then((results) => {
//           view.closePopup();
//           view.graphics.removeAll();

//           results.forEach((result) => {
//             view.graphics.add(
//               new Graphic({
//                 attributes: result.attributes,
//                 geometry: result.location,
//                 symbol: {
//                   type: "simple-marker",
//                   color: "#ff5722",
//                   size: "12px",
//                   outline: {
//                     color: "#ffffff",
//                     width: "2px",
//                   },
//                 },
//                 popupTemplate: {
//                   title: "{PlaceName}",
//                   content: "{Place_addr}",
//                 },
//               })
//             );
//           });
//         })
//         .catch((error) => console.error("Error finding places:", error));
//     };

//     reactiveUtils.when(
//       () => view.stationary,
//       () => {
//         findPlaces(select.value, view.center);
//       }
//     );

//     select.addEventListener("change", (event) => {
//       findPlaces(event.target.value, view.center);
//     });

//     return () => {
//       view.destroy();
//     };
//   }, []);

//   return <div style={{ height: "100vh", width: "100%" }} ref={mapDiv}></div>;
// };

// export default MusicMap;

import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Search from "@arcgis/core/widgets/Search";
import { useNavigate } from "react-router-dom";
import '../../Frontend/map.css'; // Adaugă stiluri pentru hartă

const MapPage = () => {
    const mapDiv = useRef(null);
    const navigate = useNavigate(); // Creează instanța navigate
  
    useEffect(() => {
      let mapView;
  
      if (mapDiv.current) {
        // Creează un WebMap ArcGIS
        const webMap = new WebMap({
          portalItem: {
            id: "338350419fdb4d5b9363ae8d91182416", // ID-ul WebMap-ului
          },
        });
  
        // Creează MapView
        mapView = new MapView({
          container: mapDiv.current,
          map: webMap,
          zoom: 12,
          center: [2.3522, 48.8566], // Coordonatele centrului (Paris)
        });
  
        // Adaugă widget-ul Search
        mapView.when(() => {
          const searchWidget = new Search({
            view: mapView, // Leagă widget-ul de MapView
          });
  
          mapView.ui.add(searchWidget, {
            position: "top-right", // Plasează widget-ul în colțul din dreapta sus
          });
        });
      }
  
      return () => {
        if (mapView) {
          mapView.destroy(); // Curăță resursele la demontare
        }
      };
    }, []);
  
    // Funcția pentru a naviga înapoi pe pagina principală
    const handleBackClick = () => {
      navigate("/"); // Navighează înapoi pe pagina principală
    };
  
    return (
      <div className="map-page">
        {/* Butonul de "Back" */}
        <button onClick={handleBackClick} className="back-button">
          &larr; Back
        </button>
  
        {/* Harta */}
        <div ref={mapDiv} style={{ height: "500px", width: "100%" }}></div>
      </div>
    );
  };
  
  export default MapPage;