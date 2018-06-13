import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GAME_STATUS } from "../constants";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { startGame } from "../actions";
import "../assets/styles/StartScreen.css";
import "../assets/styles/Loader.css";

const StartScreen = ({ gameStatus, startGame }) => {
  switch (gameStatus) {
    case GAME_STATUS.NOT_STARTED:
      return (
        <div>
          <div className="center">
            <div className="intro-text">Select number of players</div>
            <div className="start-screen">
              <div className="select-buttons">
                <Button text={"2 players"} onClick={() => startGame(2)} />
                <Button text={"3 players"} onClick={() => startGame(3)} />
                <Button text={"4 players"} onClick={() => startGame(4)} />
              </div>
            </div>
          </div>
        </div>
      );
    case GAME_STATUS.STARTING:
      return <Loader />;
    case GAME_STATUS.STARTED:
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  gameStatus: state.gameStatus
});

const mapDispatchToProps = dispatch => {
  return {
    startGame: playerCount => {
      dispatch(startGame(playerCount));
    }
  };
};

StartScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  startGame: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen);
