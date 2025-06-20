interface RoundsProps {
  title: string;
  description: string;
  rounds: RoundProps[];
}

interface RoundProps {
  title: string;
  description: string;
  advancement: string;
  prize: string;
  month: string;
  duration: string;
}

const Rounds = ({ title, description, rounds }: RoundsProps) => (
  <div className="container mx-auto flex w-full flex-col gap-8">
    <div className="grid gap-8 px-4 md:grid-cols-2">
      <h2 className="font-pp mb-4 max-w-xl text-3xl font-bold uppercase sm:text-4xl md:text-5xl xl:text-6xl">
        {title}
      </h2>
      <p className="">{description}</p>
    </div>
    <div className="flex flex-col">
      {rounds.map((round, index) => (
        <Round
          key={index}
          title={round.title}
          description={round.description}
          advancement={round.advancement}
          prize={round.prize}
          month={round.month}
          duration={round.duration}
          index={index}
        />
      ))}
    </div>
  </div>
);

interface RoundPropsComponent extends RoundProps {
  index: number;
}

const Round = ({
  title,
  description,
  advancement,
  prize,
  month,
  duration,
  index,
}: RoundPropsComponent) => {
  const opacity = (index * 5) / 100;
  const bgColor = `rgba(111, 111, 112, ${opacity})`;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex flex-col justify-between border-t border-b border-gray-800"
    >
      <div className="grid gap-4 px-4 py-8 sm:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-4 lg:col-span-3">
          <p className="bg-pink/25 mt-2 w-fit rounded-full px-2">{month}</p>
          <div className="hidden sm:block">
            <p className="text-pink/50">Duration</p>
            <p className="">{duration}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between sm:gap-4 lg:col-span-5 lg:gap-8">
          <h3 className="font-pp mb-2 text-xl font-bold sm:text-3xl">
            {title}
          </h3>
          <div>
            <p className="text-gray max-w-md">{description}</p>
          </div>
        </div>
        <div className="flex flex-col justify-end lg:col-span-2">
          <p className="text-pink">Advancement</p>
          <p className="">{advancement}</p>
        </div>
        <div className="flex flex-col justify-end lg:col-span-2">
          <p className="text-pink">Prize</p>
          <p className="">{prize}</p>
        </div>
        <div className="flex flex-col justify-end sm:hidden lg:col-span-2">
          <p className="text-pink">Duration</p>
          <p className="">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default Rounds;
