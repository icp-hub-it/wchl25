import * as React from "react";

import Landscape from "./Timeline/Landscape";
import Portrait from "./Timeline/Portrait";

const Timeline = () => {
  const [{ height, width }, setSizes] = React.useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth - 32;
      const height = (width * 695) / 732;
      setSizes({ width, height });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
