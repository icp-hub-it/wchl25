import * as FiIcon from "react-icons/fi";

import Icp from "./Icp";

const Topbar = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-2">
      <Icp width={86} height={40} />
      <div className="font-pp text-xl text-white uppercase">
        <span>Internet</span>
        <br />
        <span>Computer</span>
      </div>
    </div>
    <div className="flex items-center gap-4 p-4">
      <a
        className="font-text block rounded-full bg-white/20 px-4 py-2 align-middle text-white hover:bg-white/10 hover:underline"
        href="/faq"
      >
        FAQs
      </a>
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

export default Topbar;
