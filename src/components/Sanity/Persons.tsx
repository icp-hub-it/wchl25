import * as React from "react";
import * as FiIcons from "react-icons/fi";

import { urlFor } from "../../utils/image";

const PERSONS_PER_PAGE = 5;

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

  const onIncrementPages = () => {
    setPages((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (persons.length <= pages * PERSONS_PER_PAGE) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [pages, persons.length]);

  return (
    <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
      <h2 className="font-pp mb-4 px-4 text-3xl font-bold uppercase sm:px-0 sm:text-[60px]">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {persons.slice(0, pages * PERSONS_PER_PAGE).map((person, index) => (
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
    <h3 className="font-pp mb-2 text-2xl font-bold sm:text-[28px]">
      View more
    </h3>
    <button
      onClick={onClick}
      className="bg-pink hover:bg-pink/90 w-fit rounded-full p-10 text-white"
    >
      <FiIcons.FiPlus size={40} className="inline-block text-[40px]" />
    </button>
  </div>
);

const Person = ({ name, role, company, image }: PersonProps) => {
  const imageUrl = React.useMemo(() => {
    return urlFor(image).url();
  }, [image]);

  return (
    <div className="flex border-collapse flex-col border border-gray-700 p-8">
      <div>
        <img
          src={imageUrl}
          alt={name}
          className="mb-12 h-[144px] w-[144px] rounded-full"
          width={144}
          height={144}
          loading="lazy"
        />
      </div>
      <h3 className="font-pp mb-2 text-2xl font-bold sm:text-[28px]">{name}</h3>
      <p className="text-gray text-sm">{role}</p>
      <p className="text-gray text-sm">{company}</p>
    </div>
  );
};

export default Persons;
