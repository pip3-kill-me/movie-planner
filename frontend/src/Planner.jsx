import { useEffect, useState } from "react";
import axios from "axios";
import AddMovieForm from "./components/AddMovieForm";
import MovieCard from "./components/MovieCard";
import MovieCalendar from "./components/Calendar";
import { API_URL } from "./lib/api";

export default function Planner({ username }) {
  const [movies, setMovies] = useState([]);

  // Load movies once on mount
  const refreshMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movies`);
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  useEffect(() => {
    refreshMovies();
  }, []);

  // logout clears local storage
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-400 drop-shadow">
          🎥 Movie Planner
        </h1>
        <div className="flex items-center space-x-3">
          <p className="text-sm text-gray-400">Logado como: {username}</p>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded shadow-sm"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Add movie search / dropdown */}
      <AddMovieForm onAdd={refreshMovies} />

      {/* Movie cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {movies.length === 0 ? (
          <p className="text-gray-500 text-center col-span-2">
            Nenhum filme adicionado ainda.
          </p>
        ) : (
          movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              onRemove={refreshMovies}
              username={username}
            />
          ))
        )}
      </div>

      {/* Fancy calendar */}
      <div className="mt-12">
        <MovieCalendar movies={movies} username={username} />
      </div>
    </div>
  );
}
