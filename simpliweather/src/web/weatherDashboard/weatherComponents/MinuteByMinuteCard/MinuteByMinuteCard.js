import React from "react";
import { useSelector } from "react-redux";
import "./MinuteByMinuteCard.css";

const MinuteByMinuteCard = ({ minutelyData }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled);

  // Format time labels for the graph
  const formatTimeLabel = (timestamp, index) => {
    if (index === 0) return "Now";
    if (index % 15 === 0) {
        const minutesFromNow = index; // Each data point represents 1 minute
        return `+${minutesFromNow} min`;
    }
    if (index === 59) {
        return "+60 min";
    }
  };

  return (
    <div className={`minute-card ${isUiFilled ? 'filled' : 'unfilled'}`}>
      <h3>Rain in the Next Hour</h3>
      <div className="timeline">
        {minutelyData.map((minute, index) => (
          <div key={minute.dt} className="minute-bar">
            <div
              className="bar"
              style={{
                height: `${minute.precipitation * 10}px`, // Scale the precipitation visually
              }}
            ></div>
            <div className="time-label">{formatTimeLabel(minute.dt, index)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinuteByMinuteCard;
