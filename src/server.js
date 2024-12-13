const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const geoJSONData = require("./loc.json"); // GeoJSON cu locațiile

// Endpoint pentru căutare
app.get("/search", (req, res) => {
  const query = req.query.query?.toLowerCase();
  if (!query) {
    return res.status(400).send({ error: "Missing query parameter" });
  }

  const results = geoJSONData.features.filter((features) => {
    const { name, artist, event_year } = features.properties;
    return (
      name.toLowerCase().includes(query) ||
      artist.toLowerCase().includes(query) ||
      event_year.toString().includes(query)
    );
  });

  res.json(results);
});

// Pornirea serverului
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
