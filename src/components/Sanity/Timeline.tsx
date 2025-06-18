import * as React from "react";

import Landscape from "./Timeline/Landscape";
import Portrait from "./Timeline/Portrait";

const Timeline = () => {
  // get screen width
  const { width, height } = React.useMemo(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth - 32;
      const height = (width * 695) / 732;

      return { width, height };
    }
    return { width: 0, height: 0 };
  }, [window.innerWidth]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="hidden sm:block">
        <Landscape />
      </div>
      <div className="block w-full px-[16px] sm:hidden">
        <Portrait width={width} height={height} />
      </div>
    </div>
  );
};

export default Timeline;
