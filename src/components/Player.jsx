import React from "react";
import PropTypes from "prop-types";
import PlayerStats from "./PlayerStats";

const Player = ({ id, name, score, cards, activePlayer }) => (
  <div className={`player-base p${id + 1}`}>
    <PlayerStats name={name} score={score} highlight={id === activePlayer} />
    <div className="cards">{cards}</div>
  </div>
);

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
  activePlayer: PropTypes.number.isRequired
};

export default Player;
