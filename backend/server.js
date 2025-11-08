import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Basic middleware
app.use(cors());
app.use(bodyParser.json());

// Path helpers (so relative paths work in Docker)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "data", "movies.json");
const USERS_PATH = path.join(__dirname, "data", "users.json");


let MOVIES = [];
let USERS = [];

try {
  if (fs.existsSync(DATA_PATH)) {
    MOVIES = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  } else {
    fs.writeFileSync(DATA_PATH, "[]");
  }
} catch (err) {
  console.error("Error loading movies.json:", err);
  MOVIES = [];
}

try {
  if (fs.existsSync(USERS_PATH)) {
    USERS = JSON.parse(fs.readFileSync(USERS_PATH, "utf8"));
  } else {
    USERS = [
      { username: "matheus", password: "roberta" },
      { username: "roberta", password: "matheus" },
    ];
    fs.writeFileSync(USERS_PATH, JSON.stringify(USERS, null, 2));
  }
} catch (err) {
  console.error("Error loading users.json:", err);
  USERS = [
    { username: "matheus", password: "roberta" },
    { username: "roberta", password: "matheus" },
  ];
}

// --- LOGIN ROUTE ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  console.log("Login attempt:", req.body, "=>", user ? "OK" : "FAIL");

  if (user) {
    return res.json({ success: true, username: user.username });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Usuário ou senha incorretos" });
  }
});

// --- MOVIE ROUTES ---
app.get("/api/movies", (req, res) => {
  res.json(MOVIES);
});


// --- ADD MOVIE ---
app.post("/api/add-movie", async (req, res) => {
  const { imdbID, Title, Year, Poster, title, year, poster } = req.body;

  try {
    const omdbKey = process.env.OMDB_KEY || process.env.VITE_OMDB_KEY;
    let detail = {};
    if (imdbID) {
      const r = await fetch(
        `https://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbID}&plot=short`
      );
      detail = await r.json();
    } else if (title) {
      const r = await fetch(
        `https://www.omdbapi.com/?apikey=${omdbKey}&t=${encodeURIComponent(
          title
        )}&plot=short`
      );
      detail = await r.json();
    }

    const movie = {
      id: imdbID || detail.imdbID || String(Date.now()),
      title: detail.Title || Title || title || "Sem título",
      year: detail.Year || Year || year || "",
      poster:
        detail.Poster && detail.Poster !== "N/A"
          ? detail.Poster
          : Poster && Poster !== "N/A"
          ? Poster
          : "/placeholder.png",
      description: detail.Plot || "",
      date: "",
      host: "",
    };

    // Load, append, save
    let list = [];
    try {
      list = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
    list.push(movie);
    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2));

    res.json(movie);
  } catch (err) {
    console.error("Add movie failed:", err);
    res.status(500).json({ error: "Failed to add movie" });
  }
});



app.post("/api/schedule", (req, res) => {
  const { id, date, host } = req.body;
  const movie = MOVIES.find((m) => m.id === id);
  if (movie) {
    movie.date = date;
    movie.host = host;
    fs.writeFileSync(DATA_PATH, JSON.stringify(MOVIES, null, 2));
    return res.json({ success: true });
  }
  res.status(404).json({ success: false });
});

app.post("/api/remove", (req, res) => {
  const { id } = req.body;
  MOVIES = MOVIES.filter((m) => m.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(MOVIES, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
