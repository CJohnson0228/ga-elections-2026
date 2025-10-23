import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, className = '' }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={`${className} w-full`}>
      {/* Days - Large Display */}
      <div className="flex flex-col items-center mb-4">
        <div className="text-4xl sm:text-6xl font-mono font-bold text-white tabular-nums bg-black/20 px-4 sm:px-6 py-2 sm:py-4 rounded-lg">
          {timeRemaining.days}
        </div>
        <div className="text-sm sm:text-lg font-semibold mt-1 sm:mt-2 uppercase tracking-wide">Days</div>
      </div>

      {/* Hours:Minutes:Seconds - Digital Clock Style */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 text-white/90 w-full">
        <div className="text-center">
          <div className="text-2xl sm:text-4xl font-mono font-bold text-white tabular-nums bg-black/20 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
            {formatNumber(timeRemaining.hours)}
          </div>
          <div className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-1 uppercase tracking-wide">Hours</div>
        </div>

        <div className="text-2xl sm:text-4xl font-mono font-bold text-white mb-4 sm:mb-6">:</div>

        <div className="text-center">
          <div className="text-2xl sm:text-4xl font-mono font-bold text-white tabular-nums bg-black/20 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
            {formatNumber(timeRemaining.minutes)}
          </div>
          <div className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-1 uppercase tracking-wide">Minutes</div>
        </div>

        <div className="text-2xl sm:text-4xl font-mono font-bold text-white mb-4 sm:mb-6">:</div>

        <div className="text-center">
          <div className="text-2xl sm:text-4xl font-mono font-bold text-white tabular-nums bg-black/20 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
            {formatNumber(timeRemaining.seconds)}
          </div>
          <div className="text-[10px] sm:text-xs font-semibold mt-0.5 sm:mt-1 uppercase tracking-wide">Seconds</div>
        </div>
      </div>
    </div>
  );
}
