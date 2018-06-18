import React from "react";
import PropTypes from "prop-types";

const PlayerStats = ({ name, score, highlight }) => {
  console.log(`player-name ${highlight ? "highlight" : ""}`);
  return (
    <div className="stats">
      <p className={`player-name ${highlight ? "highlight" : ""}`}>{name}</p>
      <p className="player-score">Score: {score}</p>
    </div>
  );
};

PlayerStats.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  highlight: PropTypes.bool.isRequired
};

export default PlayerStats;
