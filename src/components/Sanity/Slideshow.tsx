import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  cards: CardProps[];
}

interface CardProps {
  title: string;
  text: string;
}

const Slideshow = ({ cards }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isScrolling = React.useRef(false);
  const [active, setActive] = React.useState(false);
  const isAnimating = React.useRef(false); // blocca scroll durante animazione

  const [cardIndex, setCardIndex] = React.useState(0);

  const handleWheel = React.useCallback(
    (e: WheelEvent) => {
      // if there is `#` in the URL, do not handle scroll
      if (window.location.hash) {
        console.log("Hash in URL, blocking scroll");
        return;
      }

      const scrollEnded =
        (cardIndex === 0 && e.deltaY < 0) ||
        (cardIndex === cards.length - 1 && e.deltaY > 0);

      if ((active || isAnimating.current) && !scrollEnded) {
        document.body.style.overflowY = "hidden"; // Prevent scrolling
      } else {
        document.body.style.overflowY = "auto"; // Allow scrolling
      }

      if (isAnimating.current) {
        console.log("Animation in progress, blocking scroll");
        e.preventDefault();
        e.stopPropagation();

        return;
      }

      if (!active) return;

      if (active && cardIndex === 0 && e.deltaY < 0) {
        return;
      }
      if (active && cardIndex === cards.length - 1 && e.deltaY > 0) {
        return;
      }

      if (isScrolling.current) return;

      e.preventDefault();

      if (e.deltaY > 10 && cardIndex < cards.length - 1) {
        isScrolling.current = true;
        isAnimating.current = true; // Set animating state to true to block further scroll
        setCardIndex((i) => i + 1);
      } else if (e.deltaY < -10 && cardIndex > 0) {
        isScrolling.current = true;
        isAnimating.current = true; // Set animating state to true to block further scroll
        setCardIndex((i) => i - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1_000);
    },
    [active, cardIndex, cards.length],
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { root: null, threshold: 1, rootMargin: "0px" },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!active) return;

    // if there is `#` in the URL, do not handle scroll
    if (window.location.hash) {
      console.log("Hash in URL, blocking scroll");
      return;
    }

    if (cardIndex === 0 || cardIndex === cards.length - 1) {
      containerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center", // Align the center of the container with the viewport
      });
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [active, cardIndex, cards.length, handleWheel]);

  const card = cards[cardIndex];

  return (
    <div
      ref={containerRef}
      className="mx-auto h-[450px] w-full overflow-hidden sm:w-1/2"
    >
      <Card
        key={cardIndex}
        title={card.title}
        text={card.text}
        isAnimating={isAnimating}
      />
    </div>
  );
};

interface CardComponentProps extends CardProps {
  isAnimating: React.RefObject<boolean>;
}

const Card = ({ title, text, isAnimating }: CardComponentProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onAnimationComplete={() => {
        isAnimating.current = false; // Reset animating state after animation completes
      }}
      className="flex h-[450px] snap-start flex-col items-center justify-center gap-4 opacity-0"
    >
      <h2 className="font-pp text-center text-2xl font-bold sm:text-[54px]">
        {title}
      </h2>
      <p className="text-center text-lg">{text}</p>
    </motion.div>
  </AnimatePresence>
);

export default Slideshow;
