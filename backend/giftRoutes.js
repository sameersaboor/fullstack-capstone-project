const express = require("express");
const { connectToDatabase } = require("./db");

const router = express.Router();

// Get all gifts
router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const gifts = await db.collection("gifts").find({}).toArray();

    res.json(gifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get gifts"
    });
  }
});

// Get one gift by ID
router.get("/api/gifts/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const gift = await db.collection("gifts").findOne({
      id: req.params.id
    });

    if (!gift) {
      return res.status(404).json({
        message: "Gift not found"
      });
    }

    res.json(gift);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get gift"
    });
  }
});

module.exports = router;