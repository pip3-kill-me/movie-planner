import { useState } from "react";

export default function MovieCard({ movie, onSchedule, onRemove, username }) {
  const [date, setDate] = useState(movie.date || "");
  const [host, setHost] = useState(movie.host || "");

  const handleSchedule = () => {
    if (!date || !host) return;
    onSchedule(movie.id, date, host);
  };

  const houseLabel =
    movie.host === username
      ? "na sua casa"
      : movie.host
      ? `na casa de ${movie.host}`
      : "";

  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-600/30 transition-all flex flex-col">
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] bg-black">
        <img
          src={
            movie.poster && movie.poster !== "N/A"
              ? movie.poster
              : "/placeholder.png"
          }
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3">
          <h2 className="text-lg font-semibold text-blue-400 truncate">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-300">{movie.year}</p>
          {movie.date && movie.host && (
            <p className="text-sm text-blue-400 mt-1">
              📅 {movie.date} {houseLabel}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {movie.description && (
        <p className="text-gray-400 text-sm px-4 py-3 line-clamp-3">
          {movie.description}
        </p>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 pb-4 mt-auto">
        {/* Show scheduling controls only if not yet scheduled */}
        {(!movie.date || !movie.host) ? (
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-full sm:w-auto"
            />
            <select
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-full sm:w-auto"
            >
              <option value="">Casa de...</option>
              <option value="matheus">Casa do Matheus</option>
              <option value="roberta">Casa da Roberta</option>
            </select>
            <button
              onClick={handleSchedule}
              className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg text-sm font-medium transition w-full sm:w-auto"
            >
              Agendar
            </button>
          </div>
        ) : (
          <div className="text-sm text-blue-400 flex-1">
            📅 {movie.date} {houseLabel}
          </div>
        )}

        {/* Remove button always visible */}
        <button
          onClick={() => onRemove(movie.id)}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-medium transition w-full sm:w-auto"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
