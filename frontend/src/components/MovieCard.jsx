import { useState } from "react";

export default function MovieCard({ movie, onSchedule, onRemove, username }) {
  const [date, setDate] = useState(movie.scheduled || "");
  const [host, setHost] = useState(movie.host || "");

  const isMatheus = username === "matheus";

  const hostLabel = (h) => {
    if (h === "matheus") return isMatheus ? "Minha casa" : "Casa dele";
    if (h === "roberta") return isMatheus ? "Casa dela" : "Minha casa";
    return "Casa...";
  };

  const colorBorder =
    movie.host === "matheus" ? "border-blue-600" : movie.host === "roberta" ? "border-purple-500" : "border-gray-800";

  return (
    <div
      className={`flex items-start bg-gray-900 border ${colorBorder} rounded-xl p-4 shadow-md hover:shadow-lg transition-all`}
    >
      <img
        src={movie.poster || ""}
        alt={movie.title}
        className="w-20 h-28 object-cover rounded-md mr-4 border border-gray-700"
      />
      <div className="flex-1">
        <h3 className="text-lg text-gray-100 font-semibold">{movie.title}</h3>
        {movie.year && <p className="text-sm text-gray-400 mb-1">📅 {movie.year}</p>}
        {movie.plot && (
          <p className="text-sm text-gray-300 mb-2 line-clamp-3">{movie.plot}</p>
        )}

        <div className="flex flex-wrap gap-2 items-center mt-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
          />
          <select
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
          >
            <option value="">Casa...</option>
            <option value="matheus">Casa do Matheus</option>
            <option value="roberta">Casa da Roberta</option>
          </select>
          <button
            onClick={() => onSchedule(movie.id, date, host)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-2 py-1 rounded"
          >
            Agendar
          </button>
          <button
            onClick={() => onRemove(movie.id)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-2 py-1 rounded"
          >
            Remover
          </button>
        </div>

        {movie.scheduled && (
          <p className="text-xs text-gray-400 mt-1">
            Sessão marcada para <b>{movie.scheduled}</b> em{" "}
            <b
              className={
                movie.host === "matheus"
                  ? "text-blue-400"
                  : movie.host === "roberta"
                  ? "text-purple-400"
                  : "text-gray-300"
              }
            >
              {hostLabel(movie.host)}
            </b>
          </p>
        )}
      </div>
    </div>
  );
}
