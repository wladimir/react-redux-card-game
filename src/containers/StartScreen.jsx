import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "../components/Button";
import { startGame, clearError } from "../actions";
import { Link } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import "../assets/styles/StartScreen.css";

export const StartScreen = ({ startGame, errorText, clearError }) => {
  if (errorText)
    return <ErrorScreen error={errorText} onClick={() => clearError()} />;

  return (
    <React.Fragment>
      <div className="center">
        <p className="intro-text">Select number of players</p>
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
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  errorText: state.errorReducer.error
});

const mapDispatchToProps = dispatch => ({
  startGame: playerCount => dispatch(startGame(playerCount)),
  clearError: () => dispatch(clearError())
});

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  clearError: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
