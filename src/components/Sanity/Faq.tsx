import * as React from "react";
import * as Icon from "react-icons/fi";

interface Props {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const Faq = ({ title, questions }: Props) => {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 sm:w-[80%]">
      <h2 className="font-pp text-2xl font-bold sm:text-[40px]">{title}</h2>
      <div className="flex flex-col">
        {questions.map((item, index) => (
          <Accordion key={index} title={item.question} content={item.answer} />
        ))}
      </div>
    </div>
  );
};

const Accordion = ({ title, content }: { title: string; content: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="faq"
      className="flex border-collapse flex-col border border-gray-700"
    >
      <div
        className="flex h-auto cursor-pointer flex-row items-center justify-between p-8"
        onClick={toggleAccordion}
      >
        <span className="font-pp text-2xl font-bold">{title}</span>
        <div className="rounded-full border border-gray-700 p-4">
          {isOpen ? (
            <Icon.FiMinus
              className="text-brandGray hover:text-brandAlt"
              size={32}
            />
          ) : (
            <Icon.FiPlus
              className="text-brandGray hover:text-brandAlt"
              size={32}
            />
          )}
        </div>
      </div>
      <div
        className={`w-full overflow-hidden transition-[max-height] duration-500 ease-in ${
          isOpen ? `max-h-[50vh] !overflow-auto` : "max-h-0"
        }`}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.25",
          }}
          className="p-8 text-xl"
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Faq;
