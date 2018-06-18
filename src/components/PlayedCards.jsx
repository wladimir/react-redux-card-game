import React from "react";
import PropTypes from "prop-types";

const PlayedCards = ({ cards }) => {
  return <ul>{cards}</ul>;
};

PlayedCards.propTypes = {
  cards: PropTypes.array.isRequired
};

export default PlayedCards;
