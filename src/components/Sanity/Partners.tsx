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

  const partnersToShow = React.useMemo(
    () => (PARTNERS_PER_PAGE + 1) * pages - 1,
    [pages],
  );

  const onIncrementPages = () => {
    setPages((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (partners.length <= partnersToShow) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  }, [partners.length, partnersToShow]);

  return (
    <div className="container mx-auto flex w-full flex-col gap-8 px-4">
      <h2 className="font-pp text-3xl font-bold uppercase sm:text-4xl md:text-5xl xl:text-6xl">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {partners.slice(0, partnersToShow).map((partner, index) => (
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
  <div className="flex border-collapse flex-col justify-between border border-gray-700 p-4 md:p-6">
    <h3 className="font-halo mb-2 text-2xl">View more</h3>
    <button
      onClick={onClick}
      className="hover:bg-pink w-fit rounded-full border border-gray-700 bg-white/10 p-8 text-white transition-all hover:border-transparent"
    >
      <FiIcons.FiPlus size={28} className="inline-block" />
    </button>
  </div>
);

const Partner = ({ name, text, website: website, logo }: PartnerProps) => {
  const imageUrl = React.useMemo(() => {
    return urlFor(logo).url();
  }, [logo]);

  return (
    <div className="flex border-collapse flex-col border border-gray-700 p-4 md:p-6">
      <div>
        <a href={website} target="_blank" className="block">
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
      <h3 className="font-pp text-md mb-2 font-bold sm:text-xl">{name}</h3>
      <p className="text-gray">{text}</p>
    </div>
  );
};

export default Partners;
