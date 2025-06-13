import * as FiIcons from "react-icons/fi";
import Globe from "./ScrollText/Globe";

interface Props {
  title: string;
  description: string;
  info: string;
  items: {
    title: string;
    text: string;
  }[];
}

const Steps = ({ title, description, info, items }: Props) => (
  <div className="flex h-max flex-col items-stretch justify-between gap-8 sm:flex-row">
    <div className="steps-bg relative flex-1">
      <div className="flex h-full flex-col justify-between gap-8 px-4 pb-8">
        <div>
          <h2 className="font-pp text-2xl font-bold">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
        <div>
          <div>
            <FiIcons.FiInfo className="inline-block text-2xl text-white" />
          </div>
          <p className="text-sm text-white sm:w-1/2">{info}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <Globe width={640} height={420} />
      </div>
    </div>
    <div className="h-full flex-1 flex-col gap-8 sm:gap-0">
      {items.map((item, index) => (
        <Step key={index} title={item.title} text={item.text} />
      ))}
    </div>
  </div>
);

const Step = ({ title, text }: { title: string; text: string }) => (
  <div className="flex flex-col gap-4 border-b border-gray-800 py-2">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-gray text-lg">{text}</p>
  </div>
);

export default Steps;
