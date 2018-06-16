import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../components/Button";
import { startGame } from "../actions";
import { Link } from "react-router-dom";
import "../assets/styles/StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <div>
      <div className="center">
        <div className="intro-text">Select number of players</div>
        <Link to="/game">
          <Button text={"2 players"} onClick={() => startGame(2)} />
        </Link>
        <Link to="/game">
          <Button text={"3 players"} onClick={() => startGame(3)} />
        </Link>
        <Link to="/game">
          <Button text={"4 players"} onClick={() => startGame(4)} />
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: playerCount => dispatch(startGame(playerCount))
  };
};

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(StartScreen);
