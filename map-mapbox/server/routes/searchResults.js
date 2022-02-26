const express = require("express");
const router = express.Router();
const axios = require("axios");
const url = require("url"); // install 불필요

router.get("/:query", async (req, res) => {
  try {
    // api키와 query string 을 함쳐서 붙여주기
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      // url qs로 붙어오는 내용들을 다 붙여줌(? 뒤에오는 키=값들)
      ...url.parse(req.url, true).query,
    });
    const query = req.params.query; // /뒤 파라이터 query 를 추출
    const { data } = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    // format data to include city and state
    data.features.forEach((item) => {
      item.context.forEach((type) => {
        if (type.id.includes("place")) {
          item.city = item.text;
        }
        if (type.id.includes("region")) {
          item.state = item.text;
        }
      });
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
