import React from "react";
import { EventType } from "../types/EventType";
import formatDate from "../hooks/useFormatDate";
import getBestImage from "../hooks/getBestImage";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { localDate, localTime } = event.dates.start;
  const formattedDate = formatDate(localDate, localTime);
  const imageUrl = getBestImage(event.images);
  const venue = event._embedded?.venues?.[0]?.name;
  const price =
    event.priceRanges &&
    event.priceRanges.length > 0 &&
    typeof event.priceRanges[0].min === "number" &&
    typeof event.priceRanges[0].max === "number"
      ? `$${event.priceRanges[0].min} – $${event.priceRanges[0].max} ${event.priceRanges[0].currency ?? ""}`.trim()
      : null;

  return (
    <div className="relative h-[480px] w-[300px] flex-shrink-0 overflow-hidden rounded-3xl shadow-xl lg:h-[520px] lg:w-[340px]">
      {/* Background image */}
      <img
        src={imageUrl}
        alt={event.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay — bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Content pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {/* Event name */}
        <h3 className="mb-3 line-clamp-2 text-xl font-extrabold leading-tight drop-shadow-lg lg:text-2xl">
          {event.name}
        </h3>

        {/* Info pills */}
        <div className="mb-4 flex flex-col gap-1.5 text-sm font-medium text-white/85">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="shrink-0 text-indigo-400" size={12} />
            <span className="truncate">{formattedDate}</span>
          </div>
          {venue && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="shrink-0 text-indigo-400" size={12} />
              <span className="truncate">{venue}</span>
            </div>
          )}
          {price && (
            <div className="flex items-center gap-2">
              <FaTicketAlt className="shrink-0 text-indigo-400" size={12} />
              <span>{price}</span>
            </div>
          )}
        </div>

        {/* CTA button */}
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-indigo-600/80 hover:text-white active:scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            View Event
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
