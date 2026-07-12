import React from "react";
import formatDate from "../hooks/useFormatDate";
import Loading from "./Loading";
import getBestImage from "../hooks/getBestImage";

interface SearchResultsProps {
  loading: boolean;
  error: string | null;
  events: any[]; // Adjust the type according to your event structure
}

const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  error,
  events,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="mt-2 text-center font-bold text-red-500">{error}</p>;
  }

  if (events.length === 0) {
    return (
      <p className="mt-4 text-center text-lg font-bold text-gray-500">
        No events found matching your search.
      </p>
    );
  }

  // Sort events by date (earliest to latest)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.dates.start.localDate).getTime();
    const dateB = new Date(b.dates.start.localDate).getTime();
    return dateA - dateB;
  });

  return (
    <ul className="mt-3 space-y-4">
      {sortedEvents.map((event) => {
        const { localDate, localTime } = event.dates.start;
        const formattedDate = formatDate(localDate, localTime);

        return (
          <li
            key={event.id}
            className="flex flex-col items-center space-y-3 rounded-3xl border bg-neutral-100 p-5 shadow-md lg:flex-row lg:items-start lg:space-x-6 lg:space-y-0 dark:border-neutral-800 dark:bg-neutral-800"
          >
            {/* Event Image */}
            <div className="w-full lg:w-3/5">
              <img
                src={getBestImage(event.images)}
                alt={event.name}
                className="h-52 w-full rounded-2xl border object-cover shadow lg:h-64 dark:border-neutral-600"
                loading="lazy"
              />
            </div>

            {/* Event Details */}
            <div className="w-full font-semibold text-neutral-600 lg:w-3/5 dark:text-neutral-300">
              <h3 className="mb-2 text-xl font-extrabold text-gray-800 lg:text-2xl dark:text-white">
                {event.name}
              </h3>
              <p>
                <span>Date:</span> {formattedDate || "TBA"}
              </p>
              <p>
                <span>Venue:</span> {event._embedded?.venues[0]?.name || "TBA"}
              </p>
              <p>
                <span>Price:</span>{" "}
                {event.priceRanges
                  ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
                  : "N/A"}
              </p>
              <p>
                <span>Genre:</span> {event.classifications[0].genre.name}
              </p>
              <p>
                <span>Subgenre:</span>{" "}
                {event.classifications[0].subGenre?.name || "N/A"}
              </p>

              {/* More Info Button */}
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="more-info my-5 inline-block"
              >
                More Info
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
