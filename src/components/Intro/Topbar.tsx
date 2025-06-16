import * as FiIcon from "react-icons/fi";

import Icp from "./Icp";

interface Props {
  ctaText: string;
  ctaUrl: string;
}

const Topbar = ({ ctaText, ctaUrl }: Props) => (
  <div className="fixed top-0 flex w-screen flex-row items-center justify-between p-4">
    <div className="itens-center flex gap-2">
      <Icp width={86} height={40} />
      <div className="font-pp text-xs leading-none text-white uppercase sm:text-xl">
        <h1>
          <span>Internet</span>
          <br />
          <span>Computer</span>
        </h1>
      </div>
    </div>
    <div className="hidden items-center justify-between gap-4 sm:flex sm:justify-end">
      <a
        className="font-text block rounded-full bg-white/20 px-4 py-3 align-middle text-white transition-all hover:bg-white/15 hover:underline"
        href="#faq"
      >
        FAQs
      </a>
      <a
        className="font-text block flex items-center rounded-full bg-white py-1 pr-4 pl-1 font-bold text-black transition-all hover:bg-white/90 hover:underline"
        href={ctaUrl}
      >
        <span className="bg-pink mr-2 rounded-full p-2 text-white">
          <FiIcon.FiArrowRight className="inline-block h-5 min-w-6 align-middle" />
        </span>
        {ctaText}
      </a>
    </div>
  </div>
);

export default Topbar;
