require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

// подключение к базе
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// тестовый endpoint
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database works ✅",
      time: result.rows[0],
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});