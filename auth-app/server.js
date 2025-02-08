const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5501;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("users.db", (err) => {
  if (err) console.error(err.message);
  console.log("Connected to the users database.");
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`
);

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (row) {
      return res
        .status(400)
        .json({ message: "You are already logged in", status: "error" });
    }

    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
      function (err) {
        if (err)
          return res
            .status(500)
            .json({ message: "Database error", status: "error" });

        res
          .status(201)
          .json({ message: "Registation successful", status: "success" });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (!row) {
        return res
          .status(401)
          .json({ message: "Please log in", status: "error" });
      }

      res.status(200).json({ message: "Login successful", status: "success" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
