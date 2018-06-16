import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";

import "../assets/styles/WinScreen.css";

const WinScreen = ({ gameWinners, onClick }) => {
  return (
    <div className="center winners-header">
      {(gameWinners.names.length > 1 ? "👑 Winners are " : "👑 Winner is ") +
        gameWinners.names.join(", ") +
        " with score: " +
        gameWinners.score}
      <p className="winner-names" />
      <p className="winner-score" />
      <Link to="/">
        <Button text="Restart game" onClick={onClick} />
      </Link>
    </div>
  );
};

WinScreen.propTypes = {
  gameWinners: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default WinScreen;
