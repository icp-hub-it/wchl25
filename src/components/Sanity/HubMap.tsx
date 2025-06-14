interface Props {
  title: string;
}

const HubMap = ({ title }: Props) => (
  <div className="flex flex-col items-center justify-center gap-8">
    <h2 className="font-pp w-full px-4 text-center text-2xl uppercase sm:w-1/2 sm:px-0 sm:text-[60px]">
      {title}
    </h2>
    <div>
      <img
        src="/Map.webp"
        alt="Hub Map"
        width={1280}
        height={720}
        className="h-auto w-full"
        loading="lazy"
      />
    </div>
  </div>
);

export default HubMap;
