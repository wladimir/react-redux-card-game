import React from "react";
import PropTypes from "prop-types";
import PlayerStats from "./PlayerStats";

const Player = ({ id, name, score, cards }) => (
  <div className={`player-base p${id + 1}`}>
    <PlayerStats name={name} score={score} />
    <div className="cards">{cards}</div>
  </div>
);

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired
};

export default Player;
