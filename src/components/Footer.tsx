import Icp from "./Intro/Icp";

const Footer = () => (
  <footer>
    <div className="flex flex-col items-center justify-between gap-8 p-12 sm:flex-row sm:gap-0">
      <div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} DFINITY Foundation
        </p>
      </div>
      <div className="flex flex-col items-center justify-between gap-16 sm:flex-row">
        <div className="flex gap-4">
          <Icp width={86} height={60} />
          <div className="font-pp text-xs text-white uppercase sm:text-xl">
            <span className="leading-[0.9]">Internet</span>
            <br />
            <span className="leading-[0.9]">Computer</span>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div>
            <span className="text-gray block text-center text-sm sm:text-right">
              In collaboration with
            </span>
          </div>
          <div className="flex gap-4">
            <Icp width={40} height={24} />
            <div className="font-pp text-white uppercase sm:text-xl">
              <span className="text-sm">ICP Hubs Network</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
