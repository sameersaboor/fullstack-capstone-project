const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("./db");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "giftlink-secret-key";

// Register
router.post("/api/register", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const existingUser = await db.collection("users").findOne({
      username
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      username,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Registration successful"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed"
    });
  }
});

// Login
router.post("/api/login", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { username, password } = req.body;

    const user = await db.collection("users").findOne({
      username
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      { username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed"
    });
  }
});
// Update user
router.put("/api/update", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").updateOne(
      { username },
      {
        $set: {
          password: hashedPassword
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User updated successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Update failed"
    });
  }
});

module.exports = router;