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
  <div className="container mx-auto flex h-max w-full flex-col items-stretch justify-between gap-4 sm:flex-row">
    <div className="steps-bg relative flex-1 overflow-hidden">
      <div className="flex h-full flex-col justify-between gap-8 px-4 pb-8">
        <div>
          <h2 className="font-pp mb-4 text-3xl font-bold uppercase sm:text-4xl md:text-5xl xl:text-6xl">
            {title}
          </h2>
          <p className="text-2xl">{description}</p>
        </div>
        <div>
          <div>
            <FiIcons.FiInfo className="inline-block text-2xl text-white" />
          </div>
          <p className="mt-4 max-w-sm text-white">{info}</p>
        </div>
      </div>
      <div className="absolute right-[-25%] bottom-[-40%] hidden h-full w-full opacity-10 sm:block">
        <Globe width={640} height={420} />
      </div>
    </div>
    <div className="h-full flex-1 flex-col">
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
  <div className="mb-4 flex flex-col gap-2 border-t border-gray-800 py-4">
    {showSteps && (
      <div className="w-fit bg-white px-2 text-black">
        <span className="font-pp block text-2xl leading-[0.9]">0{step}</span>
      </div>
    )}
    <h3 className="font-pp text-2xl font-bold sm:text-3xl">{title}</h3>
    <p className="text-gray">{text}</p>
  </div>
);

export default Steps;
