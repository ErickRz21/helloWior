import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EventType } from "../types/EventType";
import EventCard from "./EventCard";
import useCarouselScroll from "../hooks/useSliderScroll";

interface EventSliderProps {
  events: EventType[];
}

const EventSlider: React.FC<EventSliderProps> = ({ events }) => {
  const {
    carouselRef,
    scroll,
    scrollToIndex,
    bind,
    canScrollLeft,
    canScrollRight,
    isDragging,
    activeIndex,
  } = useCarouselScroll();

  // Sort events by date (earliest to latest)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.dates.start.localDate).getTime();
    const dateB = new Date(b.dates.start.localDate).getTime();
    return dateA - dateB;
  });

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      {/* Slider row */}
      <div className="relative flex w-full items-center">
        {/* Card scroll container
            px padding reveals partial cards on both sides (peek effect)
            gap-4 gives breathing room between cards */}
        <div
          className={`flex w-full snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-5 pb-1 select-none lg:px-10 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          ref={carouselRef}
          {...bind()}
          style={{ scrollbarWidth: "none" }}
        >
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="snap-start first:pl-0 last:pr-0">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="arrow left-[2px] lg:left-[12px]"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0l4 4M1 5l4-4"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right arrow */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="arrow right-[2px] lg:right-[12px]"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <svg
                className="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      {sortedEvents.length > 1 && (
        <div className="flex items-center gap-2" role="tablist" aria-label="Event navigation">
          {sortedEvents.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ir al evento ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-indigo-600 h-2 dark:bg-indigo-400"
                  : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSlider;
