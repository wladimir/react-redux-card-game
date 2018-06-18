import React from "react";
import PropTypes from "prop-types";

const PlayerHand = ({ cards }) => {
  return <div className="cards">{cards}</div>;
};

PlayerHand.propTypes = {
  cards: PropTypes.array.isRequired
};

export default PlayerHand;
