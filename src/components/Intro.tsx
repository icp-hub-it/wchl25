import Globe from "./Intro/Globe";
import Icp from "./Intro/Icp";
import Topbar from "./Intro/Topbar";

const Intro = () => (
  <div className="home-bg h-screen min-h-screen bg-cover bg-repeat">
    <Topbar />
    <div className="flex flex-col px-4 py-8 sm:px-20">
      <div className="flex justify-start">
        <span className="font-halo w-fit bg-black p-3 text-2xl leading-none text-white uppercase sm:text-[120px]">
          World
        </span>
      </div>
      <div className="flex justify-start">
        <span className="font-halo w-fit bg-black p-3 text-2xl leading-none text-white uppercase sm:text-[120px]">
          Computer
        </span>
      </div>
      <div className="flex justify-end">
        <span className="font-halo w-fit bg-black p-3 text-right text-2xl leading-none text-white uppercase sm:text-[120px]">
          Hacker
        </span>
      </div>
      <div className="flex justify-end">
        <span className="font-halo w-fit bg-black p-3 text-right text-2xl leading-none text-white uppercase sm:text-[120px]">
          League
        </span>
      </div>
      <div className="flex items-center justify-between align-middle">
        <span className="font-halo w-fit bg-black p-3 text-right text-xl leading-none text-white uppercase sm:text-[70px]">
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
  </div>
);

export default Intro;
