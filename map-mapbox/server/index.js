const express = require("express");
const cors = require("cors");
const axios = require("axios");
const url = require("url"); // install 불필요
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// 익스프레스 초기화
const app = express();

// 가능한 cors
app.use(cors());

// routes
app.get("/api/search/:query", async (req, res) => {
  try {
    // api키와 query string 을 함쳐서 붙여주기
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      // url qs로 붙어오는 내용들을 다 붙여줌(? 뒤에오는 키=값들)
      ...url.parse(req.url, ture).query,
    });
    const query = req.params.query; // /뒤 파라이터 query 를 추출
    const { data } = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));
