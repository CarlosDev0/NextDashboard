import React from "react";
import "./progressBar.css";

type propProgressBar = {
  currentId: number;
  total: number;
};

const ProgressBar = ({ currentId, total }: propProgressBar) => {
  const percentage = (currentId / total) * 100;
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }} />
      <div className="progress-text">
        {currentId} of {total}
      </div>
    </div>
  );
};

export default ProgressBar;
