import * as React from "react";
import * as FiIcons from "react-icons/fi";

import { urlFor } from "../../utils/image";

const WORKSHOPS_PER_PAGE = 2;
const RESOURCES_PER_PAGE = 3;

const getOrdinalDate = (date: Date): string => {
  const day = date.getDate();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}${suffix} ${year}`;
};

interface WorkshopAndResourcesProps {
  title: string;
  workshops: WorkshopProps[];
  resources: ResourceProps[];
}

interface WorkshopProps {
  name: string;
  text: string;
  kind: string;
  date: Date;
  participants: {
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
  }[];
}

interface ResourceProps {
  name: string;
  kind: string;
  website: string;
  participants: {
    name: string;
    role: string;
    image: {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    };
  }[];
}

const WorkshopsAndResources = ({
  title,
  workshops,
  resources,
}: WorkshopAndResourcesProps) => (
  <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
    <h2 className="font-pp mb-4 text-3xl font-bold uppercase sm:text-[60px]">
      {title}
    </h2>
    <Workshops workshops={workshops} />
    <Resources resources={resources} />
  </div>
);

const Workshops = ({ workshops }: { workshops: WorkshopProps[] }) => {
  const [pages, setPages] = React.useState<number>(1);
  const [showViewMore, setShowViewMore] = React.useState<boolean>(true);

  const onIncrementPages = () => {
    setPages((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (workshops.length <= pages * WORKSHOPS_PER_PAGE) {
      setShowViewMore(false);
    } else {
      setShowViewMore(true);
    }
  }, [workshops, pages]);

  return (
    <div className="flex w-full flex-col">
      <div className="bg-white/10 p-4">
        <span className="text-lg">Workshops</span>
      </div>
      <div className="flex flex-col">
        {workshops
          .slice(0, pages * WORKSHOPS_PER_PAGE)
          .map((workshop, index) => (
            <Workshop
              key={index}
              name={workshop.name}
              text={workshop.text}
              kind={workshop.kind}
              date={new Date(workshop.date)}
              participants={workshop.participants}
            />
          ))}
      </div>
      {showViewMore && (
        <div
          className="bg-pink/15 hover:bg-pink/10 flex items-center justify-center p-4 hover:cursor-pointer"
          onClick={onIncrementPages}
        >
          <button className="text-sm">
            <FiIcons.FiPlus
              size={20}
              className="mr-2 inline rounded-full border p-1"
            />
            View more
          </button>
        </div>
      )}
    </div>
  );
};

const Workshop = ({ name, text, kind, date, participants }: WorkshopProps) => {
  const participantsWithImg = React.useMemo(
    () =>
      participants.map((participant) => ({
        ...participant,
        image: participant.image ? urlFor(participant.image).url() : null,
      })),
    [participants],
  );

  return (
    <div className="flex flex-col justify-between gap-4 border-t border-b border-gray-800 px-8 py-4">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-4 py-8 sm:flex-1/6">
          <p className="bg-pink/25 w-fit rounded-full px-2">
            {getOrdinalDate(date)}
          </p>
          <p className="bg-blue/20 w-fit rounded-full px-2">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-8/12">
          <div>
            <p className="text-pink/50 text-sm capitalize">{kind} Workshop</p>
          </div>
          <h3 className="font-pp mb-2 text-xl font-bold sm:text-[28px]">
            {name}
          </h3>
          <div>
            <p className="text-gray text-sm">{text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 py-8 sm:flex-1/6">
          {participantsWithImg.map((participant, index) => (
            <div key={index} className="flex gap-4">
              <div>
                <img
                  src={participant.image || ""}
                  alt={participant.name}
                  className="h-[36px] w-[36px] rounded-full"
                  width={36}
                  height={36}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-md">{participant.name}</span>
                <span className="text-gray text-sm">{participant.role}</span>
                <span className="text-gray text-sm">{participant.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Resources = ({ resources }: { resources: ResourceProps[] }) => {
  const [pages, setPages] = React.useState<number>(1);
  const [showViewMore, setShowViewMore] = React.useState<boolean>(true);

  const onIncrementPages = () => {
    setPages((prev) => prev + 1);
  };

  React.useEffect(() => {
    if (resources.length <= pages * RESOURCES_PER_PAGE) {
      setShowViewMore(false);
    } else {
      setShowViewMore(true);
    }
  }, [resources, pages]);

  return (
    <div className="flex w-full flex-col">
      <div className="bg-white/10 p-4">
        <span className="text-lg">Resources</span>
      </div>
      <div className="flex flex-col">
        {resources
          .slice(0, pages * RESOURCES_PER_PAGE)
          .map((resources, index) => (
            <Resource
              key={index}
              name={resources.name}
              kind={resources.kind}
              website={resources.website}
              participants={resources.participants}
            />
          ))}
      </div>
      {showViewMore && (
        <div
          className="bg-pink/15 hover:bg-pink/10 flex items-center justify-center p-4 hover:cursor-pointer"
          onClick={onIncrementPages}
        >
          <button className="text-sm">
            <FiIcons.FiPlus
              size={20}
              className="mr-2 inline rounded-full border p-1"
            />
            View more
          </button>
        </div>
      )}
    </div>
  );
};

const Resource = ({ name, kind, website, participants }: ResourceProps) => {
  const participantsWithImg = React.useMemo(
    () =>
      participants.map((participant) => ({
        ...participant,
        image: participant.image ? urlFor(participant.image).url() : null,
      })),
    [participants],
  );

  return (
    <div className="flex flex-col justify-between gap-4 border-t border-b border-gray-800 px-8 py-4">
      <div className="flex flex-col justify-between sm:flex-row">
        <div className="flex flex-col gap-4 py-8 sm:flex-1/6">
          <a
            href={website}
            target="_blank"
            className="w-fit rounded-full bg-white px-2 text-black hover:underline"
          >
            <FiIcons.FiArrowUpRight className="text-pink mr-2 inline" />
            <span className="font-bold text-black">Explore</span>
          </a>
        </div>
        <div className="flex flex-col gap-4 sm:flex-8/12">
          <div>
            <p className="text-pink/50 text-sm capitalize">{kind}</p>
          </div>
          <h3 className="font-pp mb-2 text-xl font-bold sm:text-[28px]">
            {name}
          </h3>
        </div>
        <div className="flex flex-col gap-8 py-8 sm:flex-1/6">
          {participantsWithImg.map((participant, index) => (
            <div key={index} className="flex gap-4">
              <div>
                <img
                  src={participant.image || ""}
                  alt={participant.name}
                  className="h-[36px] w-[36px] rounded-full"
                  width={36}
                  height={36}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-md">{participant.name}</span>
                <span className="text-gray text-sm">{participant.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkshopsAndResources;
