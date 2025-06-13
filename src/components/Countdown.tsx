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

const Countdown = () => {
  const targetDate = React.useMemo(() => new Date("2025-07-01T12:00:00Z"), []); // Set your target date here

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
    <div className="blur-bar fixed right-0 bottom-4 left-0 z-50 w-screen px-20 py-8">
      <div className="flex items-center justify-between">
        <span className="font-pp block text-3xl text-white">
          Registration Opens
        </span>
        {timeLeft.days >= 0 && (
          <div className="font-pp text-2xl text-white">
            <span className="text-3xl font-bold">{timeLeft.days}</span>
            <span className="font-text text-lg uppercase">days </span>
            <span className="text-3xl font-bold">{timeLeft.hours}</span>
            <span className="font-text text-lg uppercase">hours </span>
            <span className="text-3xl font-bold">{timeLeft.minutes}</span>
            <span className="font-text text-lg uppercase">minutes </span>
          </div>
        )}
        <div>
          <a
            className="font-text bg-pink block rounded-full px-4 py-3 font-bold text-white hover:underline"
            href="/join"
          >
            <span className="mr-2 p-2 text-2xl text-white">
              <FiIcon.FiArrowRight size={24} className="mr-2 inline-block" />
              Join the League
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
