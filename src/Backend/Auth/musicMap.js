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