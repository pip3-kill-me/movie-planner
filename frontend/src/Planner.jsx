import { useEffect, useState } from "react";
import axios from "axios";
import AddMovieForm from "./components/AddMovieForm";
import MovieCard from "./components/MovieCard";
import MovieCalendar from "./components/Calendar";
import { API_URL } from "./lib/api";

export default function Planner({ username }) {
  const [movies, setMovies] = useState([]);

  // Initial load
  useEffect(() => {
    axios.get(`${API_URL}/movies`).then((r) => setMovies(r.data));
  }, []);

  // Add movie — updates instantly
  const addMovie = async (movieData) => {
    try {
      const res = await axios.post(`${API_URL}/add-movie`, movieData);
      // backend doesn’t return object, so append manually
      setMovies((prev) => [...prev, movieData]);
    } catch (err) {
      console.error("Add movie failed:", err);
    }
  };

  // Schedule movie (date + host)
  const scheduleMovie = async (id, date, host) => {
    try {
      await axios.post(`${API_URL}/schedule`, { id, date, host });
      setMovies((prev) =>
        prev.map((m) => (m.id === id ? { ...m, date, host } : m))
      );
    } catch (err) {
      console.error("Schedule movie failed:", err);
    }
  };

  // Remove movie
  const removeMovie = async (id) => {
    try {
      await axios.post(`${API_URL}/remove`, { id });
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Remove movie failed:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 fade-in">
      {/* Header */}
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

      {/* Add movie */}
      <AddMovieForm onAdd={addMovie} />

      {/* Movie grid */}
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
              onSchedule={scheduleMovie}
              onRemove={removeMovie}
              username={username}
            />
          ))
        )}
      </div>

      {/* Calendar */}
      <div className="mt-12">
        <MovieCalendar movies={movies} username={username} />
      </div>
    </div>
  );
}
