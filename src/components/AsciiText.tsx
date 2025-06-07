import { useState, useEffect, useRef, useMemo } from "react";

export function AsciiText({
  data,
  classes,
  delay = 0,
}: {
  data: {
    code: string;
  };
  classes: string;
  delay?: number;
}) {
  const asciiRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const randomChars = "@#$%&*+=-!?<>";

  // Memoize `originalLines` so it updates only when `data` changes
  const originalLines = useMemo(
    () =>
      data?.code?.split("\n").map((line: string) => line.split("")) || [[" "]],
    [data],
  );

  const TOTAL_ANIMATION_TIME = 800; // ~800ms total duration
  const totalCharacters = originalLines.reduce(
    (sum: number, line: string[]) => sum + line.length,
    0,
  );
  const stepDelay = TOTAL_ANIMATION_TIME / Math.max(totalCharacters, 1);

  // Initialize state with blank spaces
  const [animatedText, setAnimatedText] = useState(() =>
    originalLines.map((line: string[]) => line.map(() => " ")),
  );

  useEffect(() => {
    if (!asciiRef.current) return;

    let frameRef: number | null = null;
    let animationFrames: { delay: number; line: number; char: number }[] = [];

    // Reset animation when `data` changes
    hasAnimated.current = false;
    setAnimatedText(originalLines.map((line: string[]) => line.map(() => " ")));

    const startAnimation = () => {
      if (hasAnimated.current) return; // Prevent duplicate animations
      hasAnimated.current = true;

      const currentText = originalLines.map((line: string[]) =>
        line.map(() => " "),
      );
      let charIndex = 0;
      setAnimatedText(currentText);

      originalLines.forEach((line: string[], lineIndex: number) => {
        line.forEach((char, charIndexInLine) => {
          if (char === " ") return;
          const charDelay =
            stepDelay * charIndex + (hasAnimated.current ? 0 : delay); // Apply delay only for the first time

          charIndex++;
          // const charDelay = stepDelay * animationFrames.length + delay;
          animationFrames.push({
            delay: charDelay,
            line: lineIndex,
            char: charIndexInLine,
          });
        });
      });

      const animate = (startTime: number) => {
        const now = performance.now();
        const elapsedTime = now - startTime;
        const newText = [...currentText];
        let hasUpdates = false;

        animationFrames = animationFrames.filter(({ delay, line, char }) => {
          if (elapsedTime >= delay) {
            if (Math.random() < 0.6) {
              newText[line][char] = originalLines[line][char];
            } else {
              newText[line][char] =
                randomChars[Math.floor(Math.random() * randomChars.length)];
              setTimeout(() => {
                newText[line][char] = originalLines[line][char];
                setAnimatedText([...newText]);
              }, 80);
            }
            hasUpdates = true;
            return false;
          }
          return true;
        });

        if (hasUpdates) setAnimatedText([...newText]);

        if (animationFrames.length > 0) {
          frameRef = requestAnimationFrame(() => animate(startTime));
        }
      };

      setTimeout(() => {
        frameRef = requestAnimationFrame((startTime) => animate(startTime));
      }, delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          startAnimation();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(asciiRef.current);

    return () => {
      observer.disconnect();
      if (frameRef) cancelAnimationFrame(frameRef);
    };
  }, [delay, stepDelay, data, originalLines]); // `data` in dependencies ensures rerun when content changes

  return (
    <div
      ref={asciiRef}
      className={`text-primary font-mono whitespace-pre ${classes}`}
    >
      <code>
        {animatedText.map((line: string[], lineIndex: number) => (
          <div key={lineIndex}>
            {line.map((char, charIndex) => (
              <span key={charIndex}>{char}</span>
            ))}
          </div>
        ))}
      </code>
    </div>
  );
}
