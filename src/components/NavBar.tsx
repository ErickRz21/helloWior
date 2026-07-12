import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaCalendarAlt } from "react-icons/fa";
import useTicketEvents from "../hooks/useTicketData";
import SearchResults from "./SearchResults";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const genres = [
    { label: "Music", path: "music" },
    { label: "Sports", path: "sports" },
    { label: "Arts", path: "arts" },
    { label: "Misc", path: "miscellaneous" },
  ];

  const {
    data: events,
    loading,
    error,
    fetchEvents,
  } = useTicketEvents(searchQuery);

  function handleSearch() {
    console.log("Searching for:", searchQuery);
    fetchEvents();
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchInputRef.current?.blur(); // Hide the keyboard
      handleSearch(); // Trigger the search
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node) &&
      searchOpen
    ) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-3 my-2 rounded-3xl border bg-white py-4 shadow-lg lg:sticky lg:top-3 lg:mx-auto lg:my-0 lg:px-6 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="container relative mx-auto flex items-center justify-between px-6 font-semibold lg:px-0">
        {/* Mobile search and menu toggle */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="lg:hidden"
          aria-label="Toggle Search"
        >
          <FaSearch size={25} className="text-black dark:text-white" />
        </button>
        <Link
          to="/"
          className="text-xl font-bold uppercase text-black lg:text-2xl dark:text-white"
        >
          EVENTS
        </Link>
        <ul className="hidden justify-center space-x-20 pr-16 capitalize lg:flex">
          {genres.map((genre) => (
            <li key={genre.path} className="duration-300 hover:scale-125">
              <Link
                to={`/category/${genre.path}`}
                className="text-xl font-semibold hover:text-indigo-600 focus:text-indigo-500 dark:hover:text-indigo-400"
              >
                {genre.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <FaTimes size={25} className="text-black dark:text-white" />
          ) : (
            <FaBars size={25} className="text-black dark:text-white" />
          )}
        </button>

        {/* Desktop icons */}
        <div className="hidden items-center space-x-4 text-black lg:flex dark:text-white">
          <Link to="/calendar">
            <FaCalendarAlt size={20} className="icon" />
          </Link>
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <FaSearch size={20} className="icon" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute bottom-14 left-0 z-50 my-3 flex w-full flex-col items-start space-y-2 rounded-3xl border border-neutral-200 bg-white px-6 py-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
          >
            <div className="my-2 w-full rounded-2xl border bg-neutral-100 px-4 dark:border-neutral-800 dark:bg-neutral-800">
              {genres.map((genre) => (
                <li
                  key={genre.path}
                  className="flex w-full items-center justify-start border-b px-0 py-2.5 text-base duration-300 last:border-b-0 dark:border-neutral-700"
                >
                  <Link
                    to={`/category/${genre.path}`}
                    onClick={() => setMenuOpen(false)} // Close menu on link click
                    className="flex w-full items-center space-x-3"
                  >
                    <span className="font-semibold">{genre.label}</span>
                  </Link>
                </li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchBarRef}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className={`absolute ${
              searchOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            } z-50 my-3 h-[34rem] w-full transform overflow-y-auto rounded-3xl border bg-white p-4 shadow-lg transition-all duration-200 lg:right-0 lg:my-2 lg:h-[40rem] lg:w-2/4 dark:border-neutral-800 dark:bg-neutral-900 ${
              searchOpen
                ? window.innerWidth >= 1024
                  ? "top-16"
                  : "bottom-14"
                : window.innerWidth >= 1024
                  ? "top-16"
                  : "bottom-14"
            }`}
            style={{
              transformOrigin: window.innerWidth >= 1024 ? "top" : "bottom",
            }}
          >
            <div className="sticky top-0 flex items-center">
              <input
                type="text"
                value={searchQuery}
                ref={searchInputRef}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleEnterKey}
                className="mb-1 w-full rounded-3xl border border-transparent bg-neutral-100 px-5 py-3 text-lg font-semibold text-black outline-none backdrop-blur-sm duration-500 focus:border-indigo-500 focus:bg-neutral-800 dark:bg-neutral-800/70 dark:text-white"
                placeholder="Search for events..."
              />
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-neutral-600 dark:text-white"
                aria-label="Clear search"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <SearchResults loading={loading} error={error} events={events} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
