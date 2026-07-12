import React from "react";
import { EventType } from "../types/EventType";
import formatDate from "../hooks/useFormatDate";
import getBestImage from "../hooks/getBestImage";

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Destructure localDate and localTime from each event's dates
  const { localDate, localTime } = event.dates.start;
  const formattedDate = formatDate(localDate, localTime);

  return (
    <div className="flex h-[400px] min-w-[260px] max-w-[260px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-md lg:h-[430px] lg:min-w-[300px] lg:max-w-[300px] dark:border-neutral-700 dark:bg-neutral-800">
      {event.images && event.images.length > 0 && (
        <img
          className="h-full w-full object-cover"
          src={getBestImage(event.images)}
          alt={event.name}
          loading="lazy"
        />
      )}
      <div className="w-full px-5 py-1 text-center text-sm font-semibold text-neutral-700 lg:py-2 lg:text-base dark:text-white">
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-base font-extrabold text-indigo-600 lg:text-lg dark:text-indigo-400">
          {event.name}
        </div>
        <p>
          <span>Date:</span> {formattedDate}
        </p>
        {event._embedded?.venues && event._embedded.venues.length > 0 && (
          <p>
            <span>Venue:</span> {event._embedded.venues[0].name}
          </p>
        )}
        <p>
          <span>Price: </span>
          {event.priceRanges &&
            event.priceRanges.length > 0 &&
            typeof event.priceRanges[0].min === "number" &&
            typeof event.priceRanges[0].max === "number" ? (
            <>
              ${event.priceRanges[0].min} - ${event.priceRanges[0].max}{" "}
              {event.priceRanges[0].currency || ""}
            </>
          ) : (
            "N/A"
          )}
        </p>
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="more-info my-3 flex justify-center"
          >
            More info
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
