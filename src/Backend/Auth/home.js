import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import Search from "@arcgis/core/widgets/Search";
import Locator from "@arcgis/core/rest/Locator";



const API_KEY = "AIzaSyAizL1hy46uvxpUSlF3DPi2f75fPfeZuMo"; // Înlocuiește cu cheia ta Google Maps

const HomePage = () => {
  const mapDiv = useRef(null); // Referință pentru div-ul unde se va încărca harta
  const [geoJSONLayer, setGeoJSONLayer] = useState(null); // Layer pentru locațiile din GeoJSON
  const [searchQuery, setSearchQuery] = useState(""); // Interogare de căutare
  const [filteredResults, setFilteredResults] = useState(null); // Rezultatele căutării

  // Funcție pentru logout
  const handleLogout = () => {
    signOut(auth);
  };

  // Fetch locații din Google Maps
  const fetchLocations = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=music+venues+or+recording+studios+or+concert+halls&location=48.8566,2.3522&radius=10000&key=${API_KEY}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return [];
    }
  };

  // Conversie în GeoJSON
  const convertToGeoJSON = (locations) => {
    return {
      type: "FeatureCollection",
      features: locations.map((location) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            location.geometry.location.lng,
            location.geometry.location.lat,
          ],
        },
        properties: {
          Name: location.name,
          Address: location.formatted_address,
        },
      })),
    };
  };

  // Filtrare locații pe baza interogării
  const filterLocations = (geoJSON, query) => {
    const lowerCaseQuery = query.toLowerCase();
    return {
      type: "FeatureCollection",
      features: geoJSON.features.filter((feature) => {
        const { Name, Address } = feature.properties;
        return (
          Name.toLowerCase().includes(lowerCaseQuery) ||
          Address.toLowerCase().includes(lowerCaseQuery)
        );
      }),
    };
  };

  // Actualizează harta cu rezultatele filtrate
  const updateMapWithFilteredResults = (filteredGeoJSON) => {
    const layer = new GeoJSONLayer({
      source: filteredGeoJSON,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          color: "blue",
          outline: { color: "white" },
        },
      },
      popupTemplate: {
        title: "{Name}",
        content: "{Address}",
      },
    });

    if (geoJSONLayer) {
      geoJSONLayer.map.layers.removeAll(); // Șterge toate layerele existente
    }
    setGeoJSONLayer(layer);
  };

  useEffect(() => {
    let mapView; // Variabila pentru MapView

    if (mapDiv.current) {
      // Creează o hartă folosind ArcGIS WebMap
      const webMap = new WebMap({
        portalItem: {
          id: "338350419fdb4d5b9363ae8d91182416", // ID-ul hărții tale
        },
      });
      console.log("hello");

      // Inițializează MapView
      mapView = new MapView({
        container: mapDiv.current,
        map: webMap,
        zoom: 12, // Nivel de zoom
        center: [2.3522, 48.8566], // Poziția Paris
      });

      const search = new Search({
        mapView: mapView
      });
      
      mapView.ui.add(search, "top-right"); // Adaugă widget-ul în colțul din dreapta sus al hărții
      

      // Fetch locații și adaugă layer-ul pe hartă
      fetchLocations().then(
        (locations) => {
          const geoJSON = convertToGeoJSON(locations);

          if (filteredResults && webMap) {
            const geoJSON = {
              type: "FeatureCollection",
              features: filteredResults,
            };
            const layer = new GeoJSONLayer({
              source: geoJSON,
              renderer: {
                type: "simple", // Renderer simplu
                symbol: {
                  type: "simple-marker",
                  color: "blue",
                  outline: {
                    color: "white",
                  },
                },
              },
              popupTemplate: {
                title: "{Name}",
                content: "{Address}",
              },
            });

            webMap.layers.removeAll();
            webMap.add(layer); // Adaugă layer-ul pe hartă
            setGeoJSONLayer(layer); // Actualizează state-ul layer-ului
          }
        },
        [filteredResults]
      );
    }

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);

  // Gestiune pentru căutare
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const results = await response.json();
      console.log(results);
      console.log("hello");

      const filteredGeoJSON = {
        type: "FeatureCollection",
        features: results.map((result) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              result.geometry.coordinates[0],
              result.geometry.coordinates[1],
            ],
          },
          properties: result.properties,
        })),
      };
      updateMapWithFilteredResults(filteredGeoJSON);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Music Map!</h1>

      <button className="button-logout" onClick={handleLogout}>
        Logout
      </button>

      {/* Căutare */}
      <div>
        <input
          type="text"
          placeholder="Search by name or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Harta */}
      <div ref={mapDiv} style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default HomePage;
