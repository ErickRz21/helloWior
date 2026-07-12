import { useRef, useState, useCallback, useEffect } from "react";
import { useDrag } from "@use-gesture/react";

const useCarouselScroll = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Finds the card whose left edge is closest to the current scroll position.
  // This matches snap-start behavior and ensures ALL cards (first, last, and middle)
  // can be detected as active regardless of how many cards are visible on screen.
  const findActiveCard = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const cards = Array.from(el.children) as HTMLElement[];

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  // Updates arrow visibility + active card on every scroll
  const handleScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(
      Math.ceil(el.scrollLeft) < el.scrollWidth - el.clientWidth - 1,
    );
    findActiveCard();
  }, [findActiveCard]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    handleScroll(); // Run once on mount to set initial state
    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Scroll by 75% of the visible container width on arrow click
  const scroll = useCallback((direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  // Jump directly to a specific card (for dot navigation)
  const scrollToIndex = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, []);

  // Drag-to-scroll: supports mouse AND touch via @use-gesture/react
  const bind = useDrag(
    ({ movement: [mx], memo = carouselRef.current?.scrollLeft ?? 0, first, active }) => {
      const el = carouselRef.current;
      if (!el) return memo;

      const initialScrollLeft = first ? el.scrollLeft : memo;
      el.scrollLeft = initialScrollLeft - mx;

      setIsDragging(active);
      return initialScrollLeft;
    },
    {
      axis: "x",
      pointer: { touch: true, mouse: true },
      filterTaps: true,
    },
  );

  return {
    carouselRef,
    scroll,
    scrollToIndex,
    bind,
    canScrollLeft,
    canScrollRight,
    isDragging,
    activeIndex,
  };
};

export default useCarouselScroll;
