import Landscape from "./Timeline/Landscape";
import Portrait from "./Timeline/Portrait";

const Timeline = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative hidden px-[16px] sm:block">
        <Landscape />
      </div>
      <div className="relative block w-full px-[16px] sm:hidden">
        <Portrait />
      </div>
    </div>
  );
};

export default Timeline;
