const BG_COLORS = [
  "rgba(111, 111, 112, 0.15)",
  "rgba(111, 111, 112, 0.1)",
  "rgba(111, 111, 112, 0.05)",
  "rgba(111, 111, 112, 0.0)",
];

interface Props {
  title: string;
  cards: {
    title: string;
    text: string;
  }[];
}

const Cards = ({ title, cards }: Props) => (
  <div className="mx-auto flex w-full flex-col gap-4 sm:w-[80%]">
    <h2 className="font-pp w-full px-4 text-2xl font-bold uppercase sm:w-3/4 sm:px-0 sm:text-[60px]">
      {title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} text={card.text} index={index} />
      ))}
    </div>
  </div>
);

const Card = ({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) => (
  <div
    className="flex h-full flex-col border-l border-gray-700 p-8"
    style={{
      backgroundColor: BG_COLORS[index % BG_COLORS.length],
    }}
  >
    <h3 className="w-1/2 text-2xl font-bold">{title}</h3>
    <p className="text-gray mt-2 text-sm">{text}</p>
  </div>
);

export default Cards;
