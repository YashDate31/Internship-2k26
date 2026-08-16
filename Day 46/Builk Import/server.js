const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve images from the current directory
app.use("/images", express.static(path.join(__dirname)));

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cricket_db",
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed:", err);
  } else {
    console.log("Database Connected");
  }
});

// Bulk Upload Route
app.post("/bulk-upload", (req, res) => {
  const players = req.body.players;

  const values = players.map((player) => [
    player.player_name,
    player.age,
    player.img,
    player.runs
  ]);

  const sql = `
    INSERT INTO cric_players
    (player_name, age, img, runs)
    VALUES ?
  `;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Players Uploaded Successfully"
    });
  });
});

// Bulk Upload Users Route
app.post("/bulk-upload-users", (req, res) => {
  const users = req.body.users;

  const values = users.map((user) => [
    user.Name,
    user.Email,
    user.Mobile
  ]);

  const sql = `
    INSERT INTO users(name, email, mobile)
    VALUES ?
  `;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Data Uploaded Successfully"
    });
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});