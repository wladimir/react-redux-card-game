import React from "react";
import PropTypes from "prop-types";

const PlayerStats = ({ name, score }) => {
  return (
    <div className="stats">
      <p className="player-name">{name}</p>
      <p className="player-score">Score: {score}</p>
    </div>
  );
};

PlayerStats.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

export default PlayerStats;
