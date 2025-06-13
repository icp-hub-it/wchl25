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
      <div className="animate-marquee font-halo flex w-full items-center gap-2 py-1 text-[70px] leading-[0.95] whitespace-nowrap uppercase">
        {repeatedText.map((line, index) => (
          <React.Fragment key={index}>
            <span>{line}</span>
            <span>
              <Globe height={40} width={70} />
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScrollText;
