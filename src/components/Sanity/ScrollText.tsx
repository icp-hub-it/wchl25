import * as React from "react";
import Globe from "./ScrollText/Globe";

interface Props {
  text: string;
}

const ScrollText = ({ text }: Props) => {
  // repeat 10 times
  const repeatedText = Array(10).fill(text);
  return (
    <div className="relative flex items-center overflow-x-hidden bg-white/10">
      <div className="animate-marquee font-halo flex w-full items-center gap-2 py-1 text-5xl leading-[0.95] whitespace-nowrap uppercase md:text-6xl lg:text-7xl">
        {repeatedText.map((line, index) => (
          <React.Fragment key={index}>
            <span className="pt-[.2em]">{line}</span>
            <span className="mx-4 hidden sm:inline-block">
              <Globe height={40} width={70} classes="h-[1em] w-[1.3em]" />
            </span>
            <span className="inline-block sm:hidden">
              <Globe height={20} width={40} classes="h-[1em] w-[1.3em]" />
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScrollText;
