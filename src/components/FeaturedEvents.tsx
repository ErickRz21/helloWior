import useTicketEvents from "../hooks/useTicketData";
import { EventType } from "../types/EventType";
import Loading from "./Loading";
import getBestImage from "../hooks/getBestImage";

const FeaturedEvents = () => {
  // Utilize the hook with a specific keyword for fetching events in Monterrey
  const { data: events, loading, error } = useTicketEvents("Mexico");

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-500">Error fetching events: {error}</p>
    );

  // Slice the events to show (adjust the number as needed)
  const displayedEvents = events.slice(0, 4);

  return (
    <div className="container mx-auto rounded-3xl border border-neutral-200 bg-white px-3 py-5 shadow-xl dark:border-neutral-800 dark:bg-neutral-800">
      <h2 className="mb-2 text-center text-3xl font-bold">Featured Events</h2>
      {/* Main Grid Section */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {displayedEvents.map((event: EventType) => (
          <a
            key={event.id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl shadow-lg"
          >
            <img
              src={getBestImage(event.images)}
              alt={event.name}
              className="h-72 w-full transform object-cover duration-700 group-hover:scale-105 lg:h-[450px]"
            />
            {/* Overlayed Info */}
            <div
              className="absolute inset-0 flex cursor-pointer flex-col items-center justify-end bg-black/20 px-4 pb-8 text-center text-white duration-500 hover:bg-indigo-950/60"
              id="overlay"
            >
              <h2 className="text-2xl lg:text-4xl">{event.name}</h2>
              <p className="text-lg font-semibold lg:text-xl">
                {event._embedded?.venues?.[0]?.name || "Unknown Venue"}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
