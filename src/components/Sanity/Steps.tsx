import * as FiIcons from "react-icons/fi";
import Globe from "./ScrollText/Globe";

interface Props {
  title: string;
  description: string;
  info: string;
  showSteps?: boolean;
  items: {
    title: string;
    text: string;
  }[];
}

const Steps = ({ title, showSteps, description, info, items }: Props) => (
  <div className="mx-auto flex h-max w-full flex-col items-stretch justify-between gap-8 sm:w-[80%] sm:flex-row">
    <div className="steps-bg relative flex-1">
      <div className="flex h-full flex-col justify-between gap-8 px-4 pb-8">
        <div>
          <h2 className="font-pp mb-4 px-4 text-2xl font-bold uppercase sm:px-0 sm:text-[60px]">
            {title}
          </h2>
          <p className="text-2xl font-bold">{description}</p>
        </div>
        <div>
          <div>
            <FiIcons.FiInfo className="inline-block text-2xl text-white" />
          </div>
          <p className="text-sm text-white sm:w-1/2">{info}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 hidden opacity-10 sm:block">
        <Globe width={640} height={420} />
      </div>
    </div>
    <div className="h-full flex-1 flex-col gap-8 sm:gap-0">
      {items.map((item, index) => (
        <Step
          key={index}
          title={item.title}
          text={item.text}
          showSteps={showSteps}
          step={index + 1}
        />
      ))}
    </div>
  </div>
);

const Step = ({
  title,
  text,
  showSteps,
  step,
}: {
  title: string;
  text: string;
  showSteps?: boolean;
  step: number;
}) => (
  <div className="flex flex-col gap-4 border-b border-gray-800 px-4 py-2 sm:px-0">
    {showSteps && (
      <div className="w-fit bg-white px-2 text-black">
        <span className="font-pp block text-2xl leading-[0.9]">0{step}</span>
      </div>
    )}
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-gray text-lg">{text}</p>
  </div>
);

export default Steps;
