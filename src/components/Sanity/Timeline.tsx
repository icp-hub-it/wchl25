const Timeline = () => (
  <div className="flex w-full items-center justify-center">
    <div className="hidden sm:block">
      <img
        src="/timeline.webp"
        alt="World Computer Hacker League Timeline"
        className="w-full"
        loading="lazy"
      />
    </div>
    <div className="block px-2 sm:hidden">
      <img
        src="/timeline_mobile.webp"
        alt="World Computer Hacker League Timeline"
        className="w-full"
        loading="lazy"
      />
    </div>
  </div>
);

export default Timeline;
