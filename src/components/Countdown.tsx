import * as React from "react";
import * as FiIcon from "react-icons/fi";

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
    <div className="blur-bar fixed right-0 bottom-0 left-0 z-50 w-screen px-20 py-4 sm:py-8">
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
        <span className="font-pp block text-center text-xl text-white sm:text-left sm:text-3xl">
          {countdownText}
        </span>
        {timeLeft.days >= 0 && (
          <div className="font-pp text-center text-xl text-white sm:text-left sm:text-2xl">
            <span className="text-xl font-bold sm:text-3xl">
              {timeLeft.days}
            </span>
            <span className="font-text text-sm uppercase sm:text-lg">
              days{" "}
            </span>
            <span className="text-xl font-bold sm:text-3xl">
              {timeLeft.hours}
            </span>
            <span className="font-text text-sm uppercase sm:text-lg">
              hours{" "}
            </span>
            <span className="text-xl font-bold sm:text-3xl">
              {timeLeft.minutes}
            </span>
            <span className="font-text text-sm uppercase sm:text-lg">
              minutes{" "}
            </span>
          </div>
        )}
        <div>
          <a
            className="font-text bg-pink block rounded-full px-4 py-3 font-bold text-white hover:underline"
            href={ctaUrl}
          >
            <span className="text-md mr-2 p-2 text-white sm:text-2xl">
              <FiIcon.FiArrowRight size={24} className="mr-2 inline-block" />
              {ctaText}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
