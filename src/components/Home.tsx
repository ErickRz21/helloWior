import { motion } from "framer-motion";
import useTicketData from "../hooks/useTicketData";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";
import getBestImage from "../hooks/getBestImage";

const Home = () => {
  const navigate = useNavigate();
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: -500 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation variants for the cards
  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -100, rotate: 15 }, // Slide to the left
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" },
    },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 100, rotate: 15 }, // Rotate to the right
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" },
    },
  };

  const { data: events, error } = useTicketData("Music");

  const eventCards = useMemo(
    () =>
      events
        ?.slice(0, 8)
        .map((event) => ({
          image: getBestImage(event.images),
          title: event.name,
        })) ?? [],
    [events],
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex min-h-screen flex-col items-center justify-center"
    >
      <>
        {/* Event Cards Layout */}
        {!error && (
          <div className="pointer-events-none absolute hidden w-full justify-between lg:flex">
            {/* Left side images */}
            <div className="flex flex-col -space-y-10">
              {eventCards.slice(0, 4).map((event, index) => (
                <motion.div
                  key={index}
                  className="mx-28 w-52 first:ml-0 last:ml-0"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariantsLeft}
                  transition={{ delay: index * 0.3 }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-40 w-full rounded-2xl object-cover shadow-xl"
                  />
                </motion.div>
              ))}
            </div>

            {/* Right side images */}
            <div className="flex flex-col -space-y-10">
              {eventCards.slice(4).map((event, index) => (
                <motion.div
                  key={index}
                  className="-mx-28 w-52 first:mx-0 last:mx-0"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariantsRight}
                  transition={{ delay: (index + 3) * 0.3 }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-40 w-full rounded-2xl object-cover shadow-xl"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="z-10 items-center text-center">
          <h1>Welcome to the Home Page</h1>
          <motion.h2
            className="text-4xl text-indigo-600 dark:text-indigo-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Explore Exciting Events
          </motion.h2>
          <motion.button
            id="more-info"
            className="my-3 scale-150"
            onClick={() => navigate("/category/music")}
          >
            Get Started
          </motion.button>
        </div>

        {/* Scroll Down Arrow */}
        <motion.div
          className="absolute bottom-32 text-3xl text-indigo-600 lg:bottom-40 dark:text-indigo-400"
          initial={{ opacity: 0.8 }}
          animate={{
            y: [0, -10, 0], // Move up and down
          }}
          transition={{
            delay: 1,
            duration: 1.4,
            repeat: Infinity, // Loop the animation
            repeatType: "loop",
          }}
        >
          <FaArrowDown />
        </motion.div>
      </>
    </motion.div>
  );
};

export default Home;
