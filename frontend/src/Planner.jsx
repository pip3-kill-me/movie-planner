import { useEffect, useState } from "react";
import axios from "axios";
import AddMovieForm from "./components/AddMovieForm";
import MovieCard from "./components/MovieCard";
import MovieCalendar from "./components/Calendar";

import { API_URL /*, WS_URL*/ } from "./lib/api";

export default function Planner({ username }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/movies`).then((r) => setMovies(r.data));
  }, []);

  const addMovie = async (movieData) => {
    const res = await axios.post(`${API_URL}/add-movie`, movieData);
    setMovies((prev) => [...prev, res.data]);
  };

  const scheduleMovie = async (id, date, host) => {
    const res = await axios.post(`${API_URL}/schedule`, { id, date, host });
    setMovies((prev) => prev.map((m) => (m.id === id ? res.data : m)));
  };

  const removeMovie = async (id) => {
    await axios.post(`${API_URL}/remove`, { id });
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

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
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded shadow-sm"
        >
          Sair
        </button>
      </div>

      <AddMovieForm onAdd={addMovie} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onSchedule={scheduleMovie}
            onRemove={removeMovie}
            username={username}
          />
        ))}
      </div>

      <MovieCalendar movies={movies} username={username} />
    </div>
  );
}
