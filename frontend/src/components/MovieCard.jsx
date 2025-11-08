import { useState } from "react";

export default function MovieCard({ movie, onSchedule, onRemove, username }) {
  const [date, setDate] = useState(movie.date || "");
  const [host, setHost] = useState(movie.host || "");

  const handleSchedule = () => {
    if (!date || !host) return;
    onSchedule(movie.id, date, host);
  };

  return (
    <div className="bg-[#111] p-4 rounded-lg border border-gray-800 shadow hover:shadow-blue-600/20 transition-all">
      <div className="flex gap-4">
        <img
          src={
            movie.poster && movie.poster !== "N/A"
              ? movie.poster
              : "/placeholder.png"
          }
          alt={movie.title}
          className="w-24 h-36 object-cover rounded"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg font-semibold text-blue-400">
              {movie.title}
            </h2>
            <p className="text-gray-400 text-sm">{movie.year}</p>
            {movie.description && (
              <p className="text-gray-500 text-xs mt-2 line-clamp-3">
                {movie.description}
              </p>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#222] border border-gray-700 text-sm px-2 py-1 rounded"
            />
            <select
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="bg-[#222] border border-gray-700 text-sm px-2 py-1 rounded"
            >
              <option value="">Casa de...</option>
              <option value={username === "matheus" ? "roberta" : "matheus"}>
                {username === "matheus" ? "Casa da Roberta" : "Casa do Matheus"}
              </option>
              <option value={username}>
                {username === "matheus" ? "Casa do Matheus" : "Casa da Roberta"}
              </option>
            </select>
            <button
              onClick={handleSchedule}
              className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded"
            >
              Agendar
            </button>
            <button
              onClick={() => onRemove(movie.id)}
              className="bg-red-600 hover:bg-red-700 text-xs px-3 py-1 rounded"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
