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
  <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
    <div className="flex flex-col justify-between gap-8 sm:flex-row sm:gap-0">
      <h2 className="font-pp mb-4 flex-8/12 px-4 text-3xl font-bold uppercase sm:px-0 sm:text-[60px]">
        {title}
      </h2>
      <p className="flex-4/12 px-4 text-xl">{description}</p>
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
      className="flex flex-col justify-between gap-4 border-t border-b border-gray-800 px-8 py-8"
    >
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col justify-between gap-4 sm:flex-3/12">
          <p className="bg-pink/25 w-fit rounded-full px-2">{month}</p>
          <div>
            <p className="text-pink/50">Duration</p>
            <p className="">{duration}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 sm:flex-5/12">
          <h3 className="font-pp mb-2 text-xl font-bold sm:text-[28px]">
            {title}
          </h3>
          <div>
            <p className="text-gray text-sm">{description}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-8 pt-4 sm:flex-1/6">
          <p className="text-pink/50">Advancement</p>
          <p className="">{advancement}</p>
        </div>
        <div className="flex flex-col justify-between gap-8 pt-4 sm:flex-1/6">
          <p className="text-pink/50">Prize</p>
          <p className="">{prize}</p>
        </div>
      </div>
    </div>
  );
};

export default Rounds;
