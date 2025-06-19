import * as React from "react";
import * as FiIcons from "react-icons/fi";

import { urlFor } from "../../utils/image";

const PERSONS_PER_PAGE = 7;

interface Props {
  title: string;
  persons: PersonProps[];
}

interface PersonProps {
  name: string;
  role: string;
  company: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

const Persons = ({ title, persons }: Props) => {
  const [pages, setPages] = React.useState(1);
  const [showMore, setShowMore] = React.useState(true);

  const personsToShow = React.useMemo(
    () => (PERSONS_PER_PAGE + 1) * pages - 1,
    [pages],
  );

  const onIncrementPages = () => {
    setPages((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (persons.length <= personsToShow) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [persons.length, personsToShow]);

  return (
    <div className="container mx-auto flex w-full flex-col gap-8 px-4">
      <h2 className="font-pp text-3xl font-bold uppercase sm:text-4xl md:text-5xl xl:text-6xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {persons.slice(0, personsToShow).map((person, index) => (
          <Person
            key={index}
            name={person.name}
            role={person.role}
            company={person.company}
            image={person.image}
          />
        ))}
        {showMore && <ViewMoreButton onClick={onIncrementPages} />}
      </div>
    </div>
  );
};

const ViewMoreButton = ({ onClick }: { onClick: () => void }) => (
  <div className="flex border-collapse flex-col justify-between border border-gray-700 p-8">
    <h3 className="font-pp mb-2 text-2xl font-bold">View more</h3>
    <button
      onClick={onClick}
      className="hover:bg-pink w-fit cursor-pointer rounded-full border border-gray-700 bg-white/10 p-8 text-white transition-all hover:border-transparent"
    >
      <FiIcons.FiPlus size={28} className="inline-block" />
    </button>
  </div>
);

const Person = ({ name, role, company, image }: PersonProps) => {
  const imageUrl = React.useMemo(() => {
    return urlFor(image).url();
  }, [image]);

  return (
    <div className="flex border-collapse flex-col border border-gray-700 p-4 md:p-6">
      <div>
        <img
          src={imageUrl}
          alt={name}
          className="mb-4 h-[100px] w-[100px] rounded-full md:h-28 md:w-28"
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <h3 className="font-pp text-md mb-2 font-bold sm:text-xl">{name}</h3>
      <p className="text-gray">{role}</p>
      <p className="text-gray">{company}</p>
    </div>
  );
};

export default Persons;
