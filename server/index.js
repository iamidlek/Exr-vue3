const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// 익스프레스 초기화
const app = express();

// 가능한 cors
app.use(cors());

// routes
app.get("/api/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const results = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.API_KEY}`
    );
    console.log(results.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));
