import { useState } from "react";
import axios from "axios";

const OMDB_URL = "https://www.omdbapi.com/";
const apiKey = import.meta.env.VITE_OMDB_KEY;

export default function AddMovieForm({ onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);

  const searchMovies = async (q) => {
    if (q.length < 2) return setResults([]);
    try {
      const res = await axios.get(`${OMDB_URL}?s=${encodeURIComponent(q)}&apikey=${apiKey}`);
      if (res.data.Search) setResults(res.data.Search.slice(0, 5));
      else setResults([]);
    } catch (err) {
      console.error("OMDb search error:", err.message);
    }
  };

  const handleAdd = async () => {
    if (!selected) return;
    const full = await axios.get(`${OMDB_URL}?i=${selected.imdbID}&apikey=${apiKey}`);
    const info = full.data;

    onAdd({
      title: info.Title || selected.Title,
      year: info.Year || selected.Year,
      poster: info.Poster,
      plot: info.Plot || "",
    });

    setQuery("");
    setResults([]);
    setSelected(null);
  };

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchMovies(e.target.value);
          }}
          className="flex-1 px-3 py-2 rounded-l bg-gray-800 border border-gray-700 text-gray-200"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r text-white font-semibold"
        >
          Adicionar
        </button>
      </div>
      {results.length > 0 && (
        <div className="absolute w-full bg-gray-900 border border-gray-700 mt-1 rounded-lg shadow-lg z-50">
          {results.map((r) => (
            <div
              key={r.imdbID}
              className={`flex items-center p-2 hover:bg-gray-800 cursor-pointer ${
                selected?.imdbID === r.imdbID ? "bg-gray-800" : ""
              }`}
              onClick={() => setSelected(r)}
            >
              <img
                src={r.Poster !== "N/A" ? r.Poster : ""}
                alt=""
                className="w-10 h-14 object-cover rounded mr-3"
              />
              <div>
                <div className="text-gray-100 font-semibold">{r.Title}</div>
                <div className="text-gray-400 text-sm">{r.Year}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
