import { useState } from "react";
import ScrollText from "./ScrollText";

export const Leaderboard = ({ data }: any) => {
  const [activeTab, setTab] = useState(0);

  function handleClick(i: number) {
    setTab(i);
  }

  console.log(activeTab);
  return (
    <div>
      <div className="home-bg relative flex min-h-screen flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <ScrollText text={data.headline} background="bg-black" />
      </div>
      {data && (
        <div className="px-8">
          <div className="flex gap-2">
            {data.tabs.map((tab: any, i: number) => (
              <button
                onClick={() => handleClick(i)}
                className={`bg-pink cursor-pointer rounded-full px-3 py-2 ${activeTab === i ? "" : "opacity-50"}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="grid">
            <div
              className={`text-pink grid items-center gap-4 border-b border-gray-200/30 px-4 py-4 md:grid-cols-6`}
            >
              <div className="flex gap-4 md:col-span-3">
                <span className="block min-w-16"></span>
                Project
              </div>
              <div className="">Github</div>
              <div className="">App</div>
              <div className="">Score</div>
            </div>
            {[...data.tabs[activeTab].projects]
              .sort((a: any, b: any) => b.score - a.score)
              .map((p: any, index: number) => (
                <div
                  className={`grid items-center gap-4 border-b border-gray-200/30 px-4 py-4 md:grid-cols-6 ${index % 2 === 0 ? "bg-white/10" : ""}`}
                >
                  <div className="font-pp flex gap-4 text-3xl md:col-span-3">
                    <span className="text-blue block min-w-16">
                      {index + 1}.
                    </span>
                    {p.name}
                  </div>
                  <div className="">
                    <a href={p.github} target="_blank">
                      Github
                    </a>
                  </div>
                  <div className="">
                    <a href={p.github} target="_blank">
                      App
                    </a>
                  </div>
                  <div className="font-pp text-pink text-3xl">{p.score}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
