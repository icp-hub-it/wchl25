import * as React from "react";
import * as FiIcon from "react-icons/fi";
import { pushJoinLeagueCountdown } from "../utils/analytics";

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
}

const calculateTimeLeft = (targetDate: Date): CountdownParts => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

interface CountdownProps {
  date: Date;
  countdownText: string;
  ctaText: string;
  ctaUrl: string;
}

const Countdown = ({
  date,
  countdownText,
  ctaText,
  ctaUrl,
}: CountdownProps) => {
  const targetDate = React.useMemo(() => new Date(date), [date]);

  const [timeLeft, setTimeLeft] = React.useState<CountdownParts>(
    calculateTimeLeft(targetDate),
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [targetDate]);

  return (
    <div className="relative right-0 bottom-0 left-0 z-5 flex w-full flex-col items-center md:fixed md:p-4">
      <div className="flex w-full flex-col items-center justify-center gap-2 border border-white/10 px-6 py-6 backdrop-blur-xl md:w-auto md:flex-row md:justify-between md:gap-12 md:rounded-full md:px-3 md:py-3">
        <span className="font-pp block pl-4 text-center text-xl text-white sm:text-left sm:text-2xl">
          {countdownText}
        </span>
        {timeLeft.days >= 0 && (
          <div className="font-pp text-center text-xl text-white sm:text-left sm:text-2xl">
            <span className="text-2xl font-bold sm:text-3xl">
              {timeLeft.days}
            </span>
            <span className="font-text mr-4 ml-1 uppercase sm:text-base">
              days
            </span>
            <span className="text-2xl font-bold sm:text-3xl">
              {timeLeft.hours}
            </span>
            <span className="font-text mr-4 ml-1 text-base uppercase">
              hours
            </span>
            <span className="text-2xl font-bold sm:text-3xl">
              {timeLeft.minutes}
            </span>
            <span className="font-text ml-1 text-base uppercase">minutes</span>
          </div>
        )}

        <a
          className="font-text bg-pink flex items-center rounded-full py-1 pr-4 pl-1 font-bold whitespace-nowrap text-white transition-all hover:underline hover:opacity-90"
          href={ctaUrl}
          onClick={() => pushJoinLeagueCountdown()}
          target="_blank"
        >
          <span className="mr-2 p-2 text-white">
            <FiIcon.FiArrowRight size={24} className="mr-2 inline-block" />
            {ctaText}
          </span>
        </a>
      </div>
    </div>
  );
};

export default Countdown;
