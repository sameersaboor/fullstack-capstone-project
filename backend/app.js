const express = require("express");
const cors = require("cors");

const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");
const authRoutes = require("./authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GiftLink Backend is running"
  });
});

app.use(giftRoutes);
app.use(searchRoutes);
app.use(authRoutes);

// // Search API
// app.get("/api/search", (req, res) => {
//   res.json({
//     message: "Search API is working"
//   });
// });

module.exports = app;