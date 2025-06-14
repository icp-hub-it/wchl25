import * as React from "react";
import { urlFor } from "../../utils/image";

interface Props {
  title: string;
  partners: PartnerProps[];
}

interface PartnerProps {
  name: string;
  text: string;
  link: string;
  logo: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

const Partners = ({ title, partners: partner }: Props) => (
  <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
    <h2 className="font-pp mb-4 text-3xl font-bold sm:text-[60px]">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {partner.map((partner, index) => (
        <Partner
          key={index}
          name={partner.name}
          text={partner.text}
          link={partner.link}
          logo={partner.logo}
        />
      ))}
    </div>
  </div>
);

const Partner = ({ name, text, link, logo }: PartnerProps) => {
  const imageUrl = React.useMemo(() => {
    return urlFor(logo).url();
  }, [logo]);

  console.log("image", logo);
  console.log("link", link);

  return (
    <div className="flex border-collapse flex-col border border-gray-700 p-8">
      <div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={imageUrl}
            alt={name}
            className="mb-4 h-[100px] w-[100px] rounded-full"
            width={100}
            height={100}
            loading="lazy"
          />
        </a>
      </div>
      <h3 className="font-pp mb-2 text-xl font-bold">{name}</h3>
      <p className="text-gray text-sm">{text}</p>
    </div>
  );
};

export default Partners;
