import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

interface Props {
  cards: CardProps[];
}

interface CardProps {
  title: string;
  text: string;
}

const Slideshow = ({ cards }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const totalCards = cards.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
    const index = Math.floor(latest * totalCards);
    setActiveIndex(Math.min(index, totalCards - 1));
  });

  return (
    <div ref={containerRef} className="relative mx-auto h-[300vh] w-full">
      <div className="sticky top-0 h-screen">
        {cards.map((card, i) => (
          <Card
            key={i}
            title={card.title}
            text={card.text}
            activeIndex={activeIndex}
            index={i}
          />
        ))}

        {/* Scrollbar bullets */}
        <div className="absolute top-1/2 left-4 z-50 flex -translate-y-1/2 flex-col gap-2">
          {cards.map((_, i) => {
            const percentPerCard = 1 / totalCards;
            const start = i * percentPerCard;
            const end = (i + 1) * percentPerCard;

            let height = "0%";
            if (scrollProgress >= end) {
              height = "100%";
            } else if (scrollProgress >= start && scrollProgress < end) {
              const localProgress = (scrollProgress - start) / percentPerCard;
              height = `${localProgress * 100}%`;
            }

            return (
              <div
                key={i}
                className="relative h-24 w-1 overflow-hidden rounded-full bg-white/20"
              >
                <motion.div
                  className="bg-pink absolute top-0 left-0 w-full"
                  animate={{ height }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface CardComponentProps {
  title: string;
  text: string;
  activeIndex: number;
  index: number;
}

const Card = ({ title, text, activeIndex, index }: CardComponentProps) => (
  <AnimatePresence mode="wait">
    {activeIndex === index && (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 flex h-screen w-full flex-col items-center justify-center gap-4 p-4 text-center md:p-6"
      >
        <h2 className="font-pp mx-auto max-w-4xl text-3xl leading-tight font-bold sm:text-4xl md:text-5xl xl:text-6xl">
          {title}
        </h2>
        <p className="mx-auto max-w-xl text-lg">{text}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Slideshow;
