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
  <div className="container mx-auto flex w-full flex-col gap-8 px-4">
    <h2 className="font-pp text-3xl font-bold uppercase sm:text-4xl md:text-5xl xl:text-6xl">
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

  const extractTimeZoneName = (date: Date): string => {
    const OVERRIDES: Record<string, string> = {
      "Coordinated Universal Time": "UTC",
      "Brasília Standard Time": "BRT",
      "Brasilia Standard Time": "BRT",
      "Greenwich Mean Time": "GMT",
    };

    const fmt = date.toLocaleTimeString("en-US", {
      timeZoneName: "long",
    });

    // handle exceptions for time zone names
    if (OVERRIDES[fmt]) {
      return OVERRIDES[fmt];
    }

    const match = fmt.match(/([A-Z])[a-z]+/g);

    if (!match) {
      return date.toLocaleTimeString("en-US", {
        timeZoneName: "short",
      });
    }

    return match
      .slice(-4)
      .map((w) => w[0])
      .join("");
  };

  return (
    <div className="flex flex-col justify-between gap-4 border-t border-b border-gray-800 p-4 lg:p-6">
      <div className="grid gap-x-4 lg:grid-cols-4">
        <div className="mb-4 flex gap-2 lg:mb-0 lg:flex-col">
          <p className="bg-pink/25 w-fit rounded-full px-2 whitespace-nowrap">
            {getOrdinalDate(date)}
          </p>
          <p className="bg-blue/20 w-fit rounded-full px-2">
            {date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {extractTimeZoneName(date)}
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-2">
          <h3 className="font-pp text-2xl font-bold md:text-3xl">{name}</h3>
          <div>
            <p className="text-pink capitalize">{kind} Workshop</p>
          </div>
          <div>
            <p className="text-gray">{text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {participantsWithImg.map((participant, index) => (
            <div key={index} className="flex gap-4">
              <div>
                <img
                  src={participant.image || ""}
                  alt={participant.name}
                  className="h-12 w-12 rounded-full"
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
    <div className="flex flex-col justify-between gap-4 border-t border-b border-gray-800 p-4 md:p-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* This was second, now it's first */}
        <div className="order-0 flex flex-col lg:col-span-2">
          <h3 className="font-pp text-2xl font-bold md:text-3xl">{name}</h3>
          <div>
            <p className="text-pink/50 capitalize">{kind}</p>
          </div>
        </div>

        {/* This was first, now it's second */}
        <div className="flex flex-col">
          <a
            href={website}
            target="_blank"
            className="order-1 mt-1 w-fit rounded-full bg-white px-2 text-black hover:underline"
          >
            <FiIcons.FiArrowUpRight className="text-pink mr-2 inline" />
            <span className="font-bold text-black">Explore</span>
          </a>
        </div>

        {/* Unchanged */}
        <div className="flex flex-col gap-4">
          {participantsWithImg.map((participant, index) => (
            <div key={index} className="flex items-center gap-4">
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
