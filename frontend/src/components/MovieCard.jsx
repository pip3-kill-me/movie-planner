import { useState } from "react";

export default function MovieCard({ movie, onSchedule, onRemove, username }) {
  const [date, setDate] = useState(movie.date || "");
  const [host, setHost] = useState(movie.host || "");

  const handleSchedule = () => {
    if (!date || !host) return;
    onSchedule(movie.id, date, host);
  };

  return (
    <div className="bg-[#1a1a1a]/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-800 flex flex-col items-center hover:shadow-xl transition-all">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-40 h-60 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-1 text-center">{movie.title}</h2>
      <p className="text-gray-400 text-sm mb-1">{movie.year}</p>
      {movie.description && (
        <p className="text-gray-400 text-sm mb-2 text-center line-clamp-3">
          {movie.description}
        </p>
      )}
      {movie.date && movie.host ? (
        <p className="text-blue-400 text-sm mb-3">
          📅 {movie.date} — na casa de{" "}
          {username === movie.host ? "você" : movie.host}
        </p>
      ) : (
        <div className="flex flex-col items-center gap-2 mb-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#111] border border-gray-700 rounded p-1 text-sm text-white"
          />
          <select
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="bg-[#111] border border-gray-700 rounded p-1 text-sm text-white"
          >
            <option value="">Casa de...</option>
            <option value="matheus">Matheus</option>
            <option value="roberta">Roberta</option>
          </select>
          <button
            onClick={handleSchedule}
            className="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1 rounded"
          >
            Agendar
          </button>
        </div>
      )}
      <button
        onClick={() => onRemove(movie.id)}
        className="mt-1 bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-md text-sm transition-all"
      >
        Remover
      </button>
    </div>
  );
}
