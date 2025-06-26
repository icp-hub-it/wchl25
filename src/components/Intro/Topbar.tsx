import * as React from "react";
import * as FiIcon from "react-icons/fi";

import Icp from "./Icp";
import { pushFaqClick, pushJoinLeagueTopbar } from "../../utils/analytics";
import { encodeQueryParams, getUtmTags } from "../../utils/query";

interface Props {
  ctaText: string;
  ctaUrl: string;
  faqUrl: string;
}

const Topbar = ({ ctaText, ctaUrl, faqUrl }: Props) => {
  const [utmCtaUrl, setUtmCtaUrl] = React.useState<string>(ctaUrl);
  React.useEffect(() => {
    const utmTags = getUtmTags();
    const url =
      Object.keys(utmTags).length === 0
        ? ctaUrl
        : `${ctaUrl}?${encodeQueryParams(utmTags)}`;

    setUtmCtaUrl(url);
  }, [ctaUrl]);

  return (
    <div className="absolute flex w-screen py-4">
      <div className="flex w-full items-center justify-between gap-8 px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Icp width={200} height={60} classes="w-48" />
        </div>
        <div className="hidden items-center justify-between gap-4 sm:flex sm:justify-end">
          <a
            className="font-text block rounded-full bg-white/20 px-4 py-3 align-middle text-white transition-all hover:bg-white/15 hover:underline"
            href={faqUrl}
            onClick={() => pushFaqClick()}
            target="_blank"
          >
            FAQs
          </a>
          <a
            className="font-text flex items-center rounded-full bg-white py-1 pr-4 pl-1 font-bold text-black transition-all hover:bg-white/90 hover:underline"
            href={utmCtaUrl}
            onClick={() => pushJoinLeagueTopbar()}
            target="_blank"
          >
            <span className="bg-pink mr-2 rounded-full p-2 text-white">
              <FiIcon.FiArrowRight className="inline-block h-5 min-w-6 align-middle" />
            </span>
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
