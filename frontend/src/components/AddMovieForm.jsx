import { useState } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";

export default function AddMovieForm({ onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 3) {
      setResults([]);
      return;
    }
    const omdbKey = import.meta.env.VITE_OMDB_KEY;
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=${omdbKey}&s=${val}`
    );
    if (res.data.Search) setResults(res.data.Search);
  };

  const handleAdd = async (movie) => {
    try {
      await axios.post(`${API_URL}/add-movie`, {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      });
      setQuery("");
      setResults([]);
      onAdd();
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar filme..."
        className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 outline-none"
      />

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-[#1a1a1a] border border-gray-700 mt-2 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {results.map((m) => (
            <li
              key={m.imdbID}
              onClick={() => handleAdd(m)}
              className="p-2 flex items-center hover:bg-[#2a2a2a] cursor-pointer"
            >
              <img
                src={m.Poster !== "N/A" ? m.Poster : ""}
                alt={m.Title}
                className="w-10 h-14 object-cover rounded mr-3"
              />
              <div>
                <p className="text-sm font-semibold">{m.Title}</p>
                <p className="text-xs text-gray-400">{m.Year}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
