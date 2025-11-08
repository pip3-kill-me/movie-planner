import { useState } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";

export default function AddMovieForm({ onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // fetch OMDb movies
  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 3) {
      setResults([]);
      return;
    }

    try {
      const omdbKey = import.meta.env.VITE_OMDB_KEY;
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${omdbKey}&s=${val}`
      );
      if (res.data.Search) setResults(res.data.Search);
      else setResults([]);
    } catch (err) {
      console.error("OMDb fetch failed:", err);
      setResults([]);
    }
  };

  // add selected movie to backend
  const handleAdd = async (movie) => {
  try {
    const res = await axios.post(`${API_URL}/add-movie`, {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    });
    onAdd(res.data);
    setResults([]);
    setQuery("");
  } catch (err) {
    console.error("Add movie failed:", err);
  }
};


  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar filme..."
        className="w-full p-3 rounded-lg bg-[#111] border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 outline-none"
      />

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-[#1a1a1a] border border-gray-700 mt-2 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
          {results.map((m) => (
            <li
              key={m.imdbID}
              className="flex items-center justify-between p-2 hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center">
                <img
                  src={m.Poster !== "N/A" ? m.Poster : ""}
                  alt={m.Title}
                  className="w-10 h-14 object-cover rounded mr-3"
                />
                <div>
                  <p className="text-sm font-semibold">{m.Title}</p>
                  <p className="text-xs text-gray-400">{m.Year}</p>
                </div>
              </div>
              <button
                onClick={() => handleAdd(m)}
                className="bg-blue-600 hover:bg-blue-500 text-xs font-semibold px-3 py-1 rounded-md text-white transition-all"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
