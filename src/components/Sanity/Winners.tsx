import { useState } from "react";
import { urlFor } from "../../utils/image";
import ScrollText from "./ScrollText";

interface DataProps {
  data: {
    rounds: RoundProps[];
    headline: string;
  };
}

interface RoundProps {
  title: string;
  hubs: HubProps[];
}

interface HubProps {
  projects: {
    name: string;
    github: string;
    link: string;
  }[];
  name: string;
  logos?: {
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
}

export const Winners = ({ data }: DataProps) => {
  const [activeTab, setTab] = useState(0);

  function handleClick(i: number) {
    setTab(i);
  }

  return (
    <div>
      <div className="home-bg relative flex min-h-screen flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <ScrollText text={data.headline} background="bg-black" />
      </div>
      {data && (
        <div className="px-8">
          <div className="grid items-center gap-4 lg:grid-cols-4">
            <div className="text-pink hidden lg:block">Hub</div>
            <div className="mb-4 flex flex-col items-center gap-2 md:flex-row lg:col-span-3">
              {data.rounds?.map((item: RoundProps, i: number) => (
                <div
                  className="group flex grow items-center"
                  key={`button_${i}`}
                >
                  <button
                    onClick={() => handleClick(i)}
                    className={`bg-pink cursor-pointer rounded-full px-3 py-2 transition ${activeTab === i ? "" : "opacity-60 hover:opacity-80"} ${item.hubs && item.hubs?.length > 0 ? "" : "pointer-events-none"}`}
                  >
                    {item.title}
                  </button>
                  <div className="hidden grow border-t border-dashed border-white group-last:hidden md:block" />
                  <div className="hidden h-3 w-3 rounded-full bg-white group-last:hidden md:block" />
                </div>
              ))}
            </div>
          </div>
          <div className="grid">
            {data.rounds[activeTab].hubs?.map(
              (hub: HubProps, index: number) => (
                <div
                  key={`hub-${index}`}
                  className={`grid border-t border-gray-200/30 px-4 last:border-b md:grid-cols-2 md:px-0 lg:grid-cols-4 ${index % 2 === 0 ? "bg-white/10 md:bg-transparent" : ""}`}
                >
                  <div className="font-pp flex items-center justify-between gap-4 border-gray-200/30 py-4 text-3xl md:flex-col md:items-start md:justify-start md:border-r">
                    {hub.name}
                    <div className="flex gap-4">
                      {hub.logos?.map((logo, i: number) => (
                        <img
                          key={i}
                          src={urlFor(logo).url()}
                          className="w-12"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col lg:col-span-3">
                    {hub.projects?.map((p, i: number) => (
                      <div
                        key={i}
                        className={`items-cetner flex gap-4 border-gray-200/30 pb-4 last:border-none md:border-b md:pt-4 md:pl-4 ${i === 0 ? "md:bg-white/10" : i === 1 ? "md:bg-white/5" : ""}`}
                      >
                        <div
                          className={`font-pp block flex min-h-16 min-w-16 items-center justify-center gap-4 text-3xl text-black ${i === 0 ? "bg-blue" : i === 1 ? "bg-pink" : "bg-white"}`}
                        >
                          <span>{i + 1}.</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="text-2xl font-bold">{p.name}</div>
                          <div className="flex gap-4">
                            {p.github && (
                              <a
                                href={p.github}
                                target="_blank"
                                className="transition hover:opacity-70"
                              >
                                <svg
                                  width="24"
                                  height="23"
                                  viewBox="0 0 24 23"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5"
                                >
                                  <path
                                    d="M11.7599 0C8.96748 0.0001 6.26618 0.9939 4.13948 2.8034C2.01268 4.6129 0.599183 7.1202 0.151883 9.8766C-0.295417 12.6329 0.252683 15.4585 1.69808 17.8478C3.14338 20.2369 5.39178 22.0339 8.04088 22.9171C8.62888 23.02 8.84938 22.6672 8.84938 22.3585C8.84938 22.0792 8.83468 21.1531 8.83468 20.1682C5.87998 20.7121 5.11558 19.448 4.88038 18.7865C4.61938 18.1432 4.20568 17.5731 3.67498 17.1254C3.26338 16.9049 2.67538 16.361 3.66028 16.3463C4.03638 16.3871 4.39698 16.518 4.71178 16.7278C5.02648 16.9376 5.28608 17.2203 5.46838 17.5517C5.62918 17.8406 5.84548 18.095 6.10478 18.3002C6.36408 18.5054 6.66138 18.6575 6.97958 18.7475C7.29778 18.8376 7.63058 18.8641 7.95898 18.8254C8.28738 18.7867 8.60498 18.6836 8.89338 18.5219C8.94428 17.924 9.21078 17.365 9.64318 16.949C7.02658 16.655 4.29238 15.6407 4.29238 11.1425C4.27588 9.9738 4.70708 8.843 5.49778 7.9821C5.13828 6.9663 5.18028 5.8515 5.61538 4.8657C5.61538 4.8657 6.60018 4.557 8.84938 6.0711C10.7736 5.5419 12.805 5.5419 14.7293 6.0711C16.9784 4.5423 17.9633 4.8657 17.9633 4.8657C18.3984 5.8515 18.4405 6.9663 18.0809 7.9821C18.8738 8.8415 19.3056 9.9734 19.2863 11.1425C19.2863 15.6554 16.5374 16.655 13.9208 16.949C14.2014 17.2334 14.4175 17.575 14.5545 17.9503C14.6915 18.3258 14.7461 18.7263 14.7146 19.1246C14.7146 20.6976 14.6999 21.9616 14.6999 22.3585C14.6999 22.6672 14.9204 23.0347 15.5084 22.9171C18.1528 22.0268 20.3947 20.2256 21.8339 17.8352C23.2732 15.4447 23.816 12.6205 23.3656 9.8668C22.9152 7.1132 21.5009 4.6092 19.375 2.8019C17.2492 0.9945 14.5502 0.0015 11.7599 0Z"
                                    fill="#F1F1F5"
                                  />
                                </svg>
                              </a>
                            )}
                            {p.link && (
                              <a
                                href={p.link}
                                target="_blank"
                                className="transition hover:opacity-70"
                              >
                                <svg
                                  width="25"
                                  height="24"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5"
                                >
                                  <path
                                    d="M10.5195 13C10.949 13.5742 11.4969 14.0492 12.1261 14.393C12.7553 14.7367 13.451 14.9411 14.1662 14.9924C14.8813 15.0436 15.5991 14.9404 16.2709 14.6898C16.9426 14.4392 17.5526 14.0471 18.0595 13.54L21.0595 10.54C21.9703 9.59702 22.4743 8.334 22.4629 7.02302C22.4515 5.71204 21.9257 4.45797 20.9986 3.53093C20.0716 2.60389 18.8175 2.07805 17.5065 2.06666C16.1956 2.05526 14.9325 2.55924 13.9895 3.47003L12.2695 5.18003"
                                    stroke="#F1F1F5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14.5197 11C14.0903 10.4259 13.5424 9.9508 12.9132 9.60704C12.284 9.26328 11.5882 9.05886 10.8731 9.00765C10.1579 8.95643 9.44014 9.05961 8.76839 9.3102C8.09663 9.56079 7.48662 9.95291 6.97973 10.46L3.97973 13.46C3.06894 14.403 2.56497 15.666 2.57636 16.977C2.58775 18.288 3.1136 19.542 4.04064 20.4691C4.96768 21.3961 6.22174 21.922 7.53272 21.9334C8.84371 21.9447 10.1067 21.4408 11.0497 20.53L12.7597 18.82"
                                    stroke="#F1F1F5"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
