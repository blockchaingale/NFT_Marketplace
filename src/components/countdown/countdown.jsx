import { useState, useEffect } from "react";
import "./countdown.css";
const Countdown = ({countDownDate}) => {
  const [daysLeft, setdaysLeft] = useState({
    distance: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ).toString();
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      ).toString();
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();

      setdaysLeft({
        distance: distance,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return (
    <div className="countdown">
      <span>
        {daysLeft.distance < 0 ? (
          "Ended"
        ) : (
          <>
            {daysLeft.days}d &nbsp;&nbsp;{daysLeft.hours}h &nbsp; &nbsp;
            {daysLeft.minutes}m &nbsp;&nbsp;{daysLeft.seconds}s
          </>
        )}
      </span>
    </div>
  );
};

export default Countdown;
