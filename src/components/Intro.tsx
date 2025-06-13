import * as FiIcon from "react-icons/fi";

import Globe from "./Intro/Globe";
import Icp from "./Intro/Icp";
import Topbar from "./Intro/Topbar";

const Intro = () => (
  <div className="home-bg h-screen min-h-screen bg-cover bg-repeat">
    <Topbar />
    <IntroDesktop />
    <IntroMobile />
  </div>
);

const IntroDesktop = () => (
  <div className="hidden flex-col px-4 py-8 sm:flex sm:px-20">
    <div className="flex justify-start">
      <span className="font-halo w-fit bg-black p-3 text-[120px] leading-none text-white uppercase">
        World
      </span>
    </div>
    <div className="flex justify-start">
      <span className="font-halo w-fit bg-black p-3 text-[120px] leading-none text-white uppercase">
        Computer
      </span>
    </div>
    <div className="flex justify-end">
      <span className="font-halo w-fit bg-black p-3 text-right text-[120px] leading-none text-white uppercase">
        Hacker
      </span>
    </div>
    <div className="flex justify-end">
      <span className="font-halo w-fit bg-black p-3 text-right text-[120px] leading-none text-white uppercase">
        League
      </span>
    </div>
    <div className="flex items-center justify-between align-middle">
      <span className="font-halo w-fit bg-black p-3 text-right text-[70px] leading-none text-white uppercase">
        July - October <Globe width={70} height={40} /> 2025
      </span>
      <div className="bg-black p-3 text-[24px]">
        <span className="bg-black text-white opacity-60">
          In collaboration with
        </span>
        <br />
        <span className="font-text w-fit text-right text-xl leading-none text-white uppercase sm:text-[24px]">
          <Icp width={48} height={20} /> ICP HUBS NETWORK
        </span>
      </div>
    </div>
  </div>
);

const IntroMobile = () => (
  <div className="flex flex-col gap-4 px-4 py-8 sm:hidden sm:px-2">
    <div>
      <div className="flex justify-start">
        <span className="font-halo w-fit bg-black p-3 text-2xl leading-none text-white uppercase">
          World
        </span>
      </div>
      <div className="flex justify-start">
        <span className="font-halo w-fit bg-black p-3 text-2xl leading-none text-white uppercase">
          Computer
        </span>
      </div>
    </div>
    <div>
      <div className="flex justify-end">
        <span className="font-halo w-fit bg-black p-3 text-right text-2xl leading-none text-white uppercase">
          Hacker
        </span>
      </div>
      <div className="flex justify-end">
        <span className="font-halo w-fit bg-black p-3 text-right text-2xl leading-none text-white uppercase">
          League
        </span>
      </div>
    </div>
    <div className="flex items-center justify-start align-middle">
      <span className="font-halo w-fit bg-black p-3 text-right text-xl leading-none text-white uppercase">
        July - October <Globe width={40} height={20} /> 2025
      </span>
    </div>
    <div className="flex items-center justify-end align-middle">
      <div className="bg-black p-3 text-sm">
        <span className="bg-black text-white opacity-60">
          In collaboration with
        </span>
        <br />
        <span className="font-text text-md w-fit text-right leading-none text-white uppercase sm:text-[24px]">
          <Icp width={30} height={16} /> ICP HUBS NETWORK
        </span>
      </div>
    </div>
    <div className="my-12 flex items-center">
      <a
        className="font-text block rounded-full bg-white px-4 py-3 align-middle font-bold text-black hover:bg-white/90 hover:underline"
        href="/join"
      >
        <span className="bg-pink mr-2 rounded-full p-2 text-white">
          <FiIcon.FiArrowRight className="inline-block align-middle" />
        </span>
        Join the League
      </a>
    </div>
  </div>
);

export default Intro;
