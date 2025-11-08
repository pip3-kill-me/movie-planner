import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useMemo } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../rbc-dark.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function EventCard({ event }) {
  const isMatheus = event.username === "matheus";

  let label = "";
  if (event.host === "matheus")
    label = isMatheus ? "Minha casa" : "Casa dele";
  else if (event.host === "roberta")
    label = isMatheus ? "Casa dela" : "Minha casa";

  const color =
    event.host === "matheus"
      ? "rgba(59,130,246,0.85)"
      : event.host === "roberta"
      ? "rgba(168,85,247,0.85)"
      : "rgba(75,85,99,0.85)";

  return (
    <div
      className="group relative cursor-pointer transition-all"
      style={{
        backgroundColor: color,
        borderRadius: "6px",
        padding: "2px 4px",
        color: "#fff",
        fontSize: "0.85rem",
      }}
    >
      <span>{event.title}</span>
      <div
        className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-gray-900/95 text-gray-100 border border-gray-700 rounded-lg shadow-lg p-3 w-60 z-50 animate-fadeIn"
        style={{ left: "-50%" }}
      >
        <h4 className="font-semibold text-blue-400 mb-1">{event.title}</h4>
        <p className="text-sm text-gray-300">🏡 <b>{label}</b></p>
        {event.plot && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-3">{event.plot}</p>
        )}
      </div>
    </div>
  );
}

export default function MovieCalendar({ movies, username }) {
  const events = useMemo(
    () =>
      movies
        .filter((m) => m.scheduled)
        .map((m) => {
          const [year, month, day] = m.scheduled.split("-").map(Number);
          const dateObj = new Date(year, month - 1, day);
          return {
            title: m.title,
            start: dateObj,
            end: dateObj,
            allDay: true,
            host: m.host,
            plot: m.plot,
            username,
          };
        }),
    [movies, username]
  );

  return (
    <div className="bg-gray-900/70 border border-gray-800 mt-10 p-6 rounded-2xl backdrop-blur-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">
        🎬 Agenda de Sessões
      </h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        components={{ event: EventCard }}
        views={["month"]}
        popup
        style={{ height: 520 }}
      />
    </div>
  );
}
