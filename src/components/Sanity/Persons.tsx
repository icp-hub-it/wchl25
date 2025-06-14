import * as React from "react";
import { urlFor } from "../../utils/image";

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

const Persons = ({ title, persons }: Props) => (
  <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
    <h2 className="font-pp mb-4 text-3xl font-bold sm:text-[60px]">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {persons.map((person, index) => (
        <Person
          key={index}
          name={person.name}
          role={person.role}
          company={person.company}
          image={person.image}
        />
      ))}
    </div>
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
      <h3 className="font-pp mb-2 text-xl font-bold">{name}</h3>
      <p className="text-gray text-sm">{role}</p>
      <p className="text-gray text-sm">{company}</p>
    </div>
  );
};

export default Persons;
