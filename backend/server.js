import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "data", "movies.json");
const USERS = [
  { username: "matheus", password: "roberta" },
  { username: "roberta", password: "matheus" },
];

const allowedOrigins = [
  "http://localhost:3000",
  "https://nossalista.plets.win",
];

app.use(cors({
  origin: allowedOrigins,
}));

function loadMovies() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function saveMovies(movies) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2));
}

// LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // find the matching user in the array
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return res.json({ success: true, username: user.username });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Usuário ou senha incorretos" });
  }
});

// MOVIES
app.get("/api/movies", (req, res) => res.json(loadMovies()));

app.post("/api/add-movie", async (req, res) => {
  const { title, year, poster, plot } = req.body;
  const movies = loadMovies();
  const apiKey = process.env.OMDB_API_KEY;
  let info = { Title: title, Year: year, Poster: poster, Plot: plot };

  try {
    if (!poster) {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`
      );
      if (data && data.Response === "True") info = data;
    }
  } catch (err) {
    console.warn("OMDb lookup failed:", err.message);
  }

  const newMovie = {
    id: Date.now().toString(),
    title: info.Title || title,
    year: info.Year || "",
    poster: info.Poster && info.Poster !== "N/A" ? info.Poster : "",
    plot: info.Plot || "",
  };

  movies.push(newMovie);
  saveMovies(movies);
  res.json(newMovie);
});

app.post("/api/schedule", (req, res) => {
  const { id, date, host } = req.body; // host = "matheus" or "roberta"
  const movies = loadMovies();
  const idx = movies.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).send();
  movies[idx] = { ...movies[idx], scheduled: date, host };
  saveMovies(movies);
  res.json(movies[idx]);
});

app.post("/api/remove", (req, res) => {
  const { id } = req.body;
  const movies = loadMovies().filter((m) => m.id !== id);
  saveMovies(movies);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🎬 Backend running on port ${PORT}`));
