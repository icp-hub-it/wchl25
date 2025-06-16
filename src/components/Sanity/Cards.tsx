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
  <div className="container mx-auto flex w-full flex-col gap-8 lg:gap-12">
    <h2 className="font-pp block w-full max-w-5xl px-4 text-3xl font-bold uppercase sm:text-4xl md:text-5xl xl:text-6xl">
      {title}
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:px-4">
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
    className="flex h-full flex-col border-t border-gray-700 p-4 pb-10 lg:min-h-80 lg:border-t-0 lg:border-l"
    style={{
      backgroundColor: BG_COLORS[index % BG_COLORS.length],
    }}
  >
    <h3 className="max-w-40 text-2xl">{title}</h3>
    <p className="text-gray mt-3">{text}</p>
  </div>
);

export default Cards;
