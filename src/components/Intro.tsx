import * as FiIcon from "react-icons/fi";

import Globe from "./Intro/Globe";
import Icp from "./Intro/Icp";
import Topbar from "./Intro/Topbar";
import Countdown from "./Countdown";

interface Props {
  homepage: {
    ctaText: string;
    ctaUrl: string;
    countdownText: string;
    countdownDate: Date;
  };
}

const Intro = ({ homepage }: Props) => {
  return (
    <div className="home-bg relative h-screen min-h-screen bg-cover bg-repeat">
      <Topbar {...homepage} />
      <IntroDesktop homepage={homepage} />
    </div>
  );
};

const IntroDesktop = ({ homepage }: Props) => (
  <div className="flex h-full flex-col justify-center">
    <div className="flex grow flex-col justify-center px-4 pt-20 md:px-8 md:pb-20">
      <div className="flex justify-start">
        <span className="font-halo w-fit bg-black px-3 pt-[.2em] text-6xl leading-[0.75] text-white uppercase sm:text-7xl md:text-8xl xl:text-9xl">
          World
        </span>
      </div>
      <div className="mb-2 flex justify-start">
        <span className="font-halo w-fit bg-black px-3 pt-[.2em] text-6xl leading-[0.75] text-white uppercase sm:text-7xl md:text-8xl xl:text-9xl">
          Computer
        </span>
      </div>
      <div className="flex justify-end">
        <span className="font-halo w-fit bg-black px-3 pt-[.2em] text-right text-6xl leading-[0.75] text-white uppercase sm:text-7xl md:text-8xl xl:text-9xl">
          Hacker
        </span>
      </div>
      <div className="mb-2 flex justify-end">
        <span className="font-halo w-fit bg-black px-3 pt-[.2em] text-right text-6xl leading-[0.75] text-white uppercase sm:text-7xl md:text-8xl xl:text-9xl">
          League
        </span>
      </div>
      <div className="flex flex-col items-center justify-between align-middle lg:flex-row">
        <span className="font-halo mr-auto mb-2 w-fit bg-black px-3 py-1 text-right text-2xl leading-[0.9] text-white uppercase sm:text-3xl lg:text-5xl">
          <span className="inline-block pt-[.2em]">July - October</span>
          <Globe width={70} height={40} />
          <span className="inline-block pt-[.2em]">2025</span>
        </span>
        <div className="ml-auto bg-black p-3">
          <span className="bg-black text-white opacity-60">
            In collaboration with
          </span>
          <br />
          <span className="font-text mt-1 flex w-fit items-center gap-2 text-right text-xl leading-[0.9] text-white uppercase">
            <Icp width={48} height={20} /> ICP HUBS NETWORK
          </span>
        </div>
      </div>
    </div>
    <Countdown
      ctaText={homepage.ctaText}
      ctaUrl={homepage.ctaUrl}
      countdownText={homepage.countdownText}
      date={homepage.countdownDate}
    />
  </div>
);

// const IntroMobile = () => (
//   <div className="flex flex-col gap-4 px-4 py-8 sm:hidden sm:px-2">
//     <div>
//       <div className="flex justify-start">
//         <span className="font-halo w-fit bg-black p-3 text-2xl leading-none text-white uppercase">
//           World
//         </span>
//       </div>
//       <div className="flex justify-start">
//         <span className="font-halo w-fit bg-black p-3 text-2xl leading-none text-white uppercase">
//           Computer
//         </span>
//       </div>
//     </div>
//     <div>
//       <div className="flex justify-end">
//         <span className="font-halo w-fit bg-black p-3 text-right text-2xl leading-none text-white uppercase">
//           Hacker
//         </span>
//       </div>
//       <div className="flex justify-end">
//         <span className="font-halo w-fit bg-black p-3 text-right text-2xl leading-none text-white uppercase">
//           League
//         </span>
//       </div>
//     </div>
//     <div className="flex items-center justify-start align-middle">
//       <span className="font-halo w-fit bg-black p-3 text-right text-xl leading-none text-white uppercase">
//         July - October <Globe width={40} height={20} /> 2025
//       </span>
//     </div>
//     <div className="flex items-center justify-end align-middle">
//       <div className="bg-black p-3 text-sm">
//         <span className="bg-black text-white opacity-60">
//           In collaboration with
//         </span>
//         <br />
//         <span className="font-text text-md w-fit text-right leading-none text-white uppercase sm:text-[24px]">
//           <Icp width={30} height={16} /> ICP HUBS NETWORK
//         </span>
//       </div>
//     </div>
//     <div className="my-12 flex items-center">
//       <a
//         className="font-text block rounded-full bg-white px-4 py-3 align-middle font-bold text-black hover:bg-white/90 hover:underline"
//         href="/join"
//       >
//         <span className="bg-pink mr-2 rounded-full p-2 text-white">
//           <FiIcon.FiArrowRight className="inline-block align-middle" />
//         </span>
//         Join the League
//       </a>
//     </div>
//     {/* <Countdown
//       ctaText={homepage.ctaText}
//       ctaUrl={homepage.ctaUrl}
//       countdownText={homepage.countdownText}
//       date={homepage.countdownDate}
//     /> */}
//   </div>
// );

export default Intro;
