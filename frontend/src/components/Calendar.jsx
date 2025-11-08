import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tooltip } from "react-tooltip";
import { useEffect } from "react";

export default function MovieCalendar({ movies, username }) {
  // build events
  const events = movies
    .filter((m) => m.date)
    .map((m) => ({
      id: m.id,
      title: `${m.title} (${m.host === username ? "sua casa" : m.host})`,
      start: m.date,
      extendedProps: {
        poster: m.poster,
        host: m.host,
      },
    }));

  useEffect(() => {
    // dynamically init tooltips
    import("react-tooltip").then(({ Tooltip }) => Tooltip.rebuild && Tooltip.rebuild());
  }, [movies]);

  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl shadow-lg p-4">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
        🗓️ Agenda de Filmes
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        eventDisplay="block"
        eventBackgroundColor="#2563eb"
        eventBorderColor="#2563eb"
        eventTextColor="#fff"
        events={events}
        eventContent={(arg) => (
          <div
            data-tooltip-id={`tooltip-${arg.event.id}`}
            className="cursor-pointer"
          >
            <p className="font-medium">{arg.event.title}</p>
          </div>
        )}
      />

      {/* tooltips with poster */}
      {events.map((e) => (
        <Tooltip
          key={e.id}
          id={`tooltip-${e.id}`}
          place="top"
          className="!bg-[#1a1a1a] !border !border-gray-700 !p-2 !rounded-lg !max-w-xs"
        >
          <div className="flex items-center gap-3">
            <img
              src={e.extendedProps.poster}
              alt={e.title}
              className="w-12 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-blue-400 text-sm">{e.title}</p>
              <p className="text-xs text-gray-400">
                {e.extendedProps.host === username
                  ? "na sua casa"
                  : `na casa de ${e.extendedProps.host}`}
              </p>
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
