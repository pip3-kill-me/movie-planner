import { useState } from "react";

export default function MovieCard({ movie, onSchedule, onRemove, username }) {
  const [date, setDate] = useState(movie.date || "");
  const [host, setHost] = useState(movie.host || "");

  const handleSchedule = () => {
    if (!date || !host) return;
    onSchedule(movie.id, date, host);
  };

  // Determine house label for display
  const houseLabel = movie.host
    ? movie.host === username
      ? "na sua casa"
      : `na casa de ${movie.host}`
    : "";

  return (
    <div className="bg-gradient-to-br from-[#161616] to-[#0d0d0d] border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-600/20 transition-all group">
      {/* Poster */}
      <div className="relative">
        <img
          src={
            movie.poster && movie.poster !== "N/A"
              ? movie.poster
              : "/placeholder.png"
          }
          alt={movie.title}
          className="w-full h-72 object-cover opacity-90 group-hover:opacity-100 transition-all"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-xl font-bold text-blue-400 drop-shadow-md">
            {movie.title}
          </h2>
          <p className="text-gray-300 text-sm">{movie.year}</p>
          {movie.date && movie.host && (
            <p className="text-sm text-blue-400 mt-1">
              📅 {movie.date} {houseLabel}
            </p>
          )}
        </div>
      </div>

      {/* Info / actions */}
      <div className="p-4 flex flex-col justify-between h-full">
        {movie.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {movie.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
          {!movie.date && (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#111] border border-gray-700 rounded-lg p-2 text-sm text-white"
              />
              <select
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="bg-[#111] border border-gray-700 rounded-lg p-2 text-sm text-white"
              >
                <option value="">Casa de...</option>
                <option value="matheus">Casa do Matheus</option>
                <option value="roberta">Casa da Roberta</option>
              </select>
              <button
                onClick={handleSchedule}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg text-sm font-medium transition"
              >
                Agendar
              </button>
            </div>
          )}
          <button
            onClick={() => onRemove(movie.id)}
            className="bg-red-600 hover:bg-red-500 px-3 py-2 rounded-lg text-sm font-medium transition self-end sm:self-auto"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
