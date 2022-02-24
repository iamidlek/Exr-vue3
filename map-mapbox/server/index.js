const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// 익스프레스 초기화
const app = express();

// 가능한 cors
app.use(cors());

// routes
app.use("/api/search/", require("./routes/searchResults.js"));

app.listen(PORT, () => console.log(`app has started on port: ${PORT}`));
