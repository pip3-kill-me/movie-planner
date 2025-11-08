import axios from "axios";
import { API_URL } from "../lib/api";

export default function MovieCard({ movie, onRemove }) {
  const handleRemove = async () => {
    try {
      await axios.post(`${API_URL}/remove`, { id: movie.id });
      onRemove();
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg border border-gray-800 hover:shadow-xl transition-all flex flex-col items-center">
      {movie.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-32 h-48 object-cover rounded-lg mb-3"
        />
      )}
      <p className="text-lg font-semibold text-center">{movie.title}</p>
      <p className="text-sm text-gray-400 mb-2">{movie.year}</p>
      {movie.date && (
        <p className="text-sm text-blue-400 mb-2">
          🎥 {movie.date} — {movie.host}
        </p>
      )}
      <button
        onClick={handleRemove}
        className="mt-2 bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-md text-sm transition-all"
      >
        Remover
      </button>
    </div>
  );
}
