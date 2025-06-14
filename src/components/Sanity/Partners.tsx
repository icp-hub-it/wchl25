import * as React from "react";
import * as FiIcons from "react-icons/fi";

import { urlFor } from "../../utils/image";

const PARTNERS_PER_PAGE = 7;

interface Props {
  title: string;
  partners: PartnerProps[];
}

interface PartnerProps {
  name: string;
  text: string;
  website: string;
  logo: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

const Partners = ({ title, partners }: Props) => {
  const [pages, setPages] = React.useState(1);
  const [showMore, setShowMore] = React.useState(true);

  const onIncrementPages = () => {
    setPages((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (partners.length <= pages * PARTNERS_PER_PAGE) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [pages, partners.length]);

  return (
    <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
      <h2 className="font-pp mb-4 text-3xl font-bold sm:text-[60px]">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {partners.slice(0, pages * PARTNERS_PER_PAGE).map((partner, index) => (
          <Partner
            key={index}
            name={partner.name}
            text={partner.text}
            website={partner.website}
            logo={partner.logo}
          />
        ))}
        {showMore && <ViewMoreButton onClick={onIncrementPages} />}
      </div>
    </div>
  );
};

const ViewMoreButton = ({ onClick }: { onClick: () => void }) => (
  <div className="flex border-collapse flex-col justify-between border border-gray-700 p-8">
    <h3 className="font-halo mb-2 text-2xl sm:text-[28px]">View more</h3>
    <button
      onClick={onClick}
      className="bg-pink hover:bg-pink/90 w-fit rounded-full p-8 text-white"
    >
      <FiIcons.FiPlus size={28} className="inline-block text-[28px]" />
    </button>
  </div>
);

const Partner = ({ name, text, website: website, logo }: PartnerProps) => {
  const imageUrl = React.useMemo(() => {
    return urlFor(logo).url();
  }, [logo]);

  return (
    <div className="flex border-collapse flex-col border border-gray-700 p-8">
      <div>
        <a
          href={website}
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
