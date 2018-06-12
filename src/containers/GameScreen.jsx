import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GAME_STATUS } from "../constants/GameStatus";
import { Grid, Row, Col } from "react-flexbox-grid";

let GameScreen = ({ gameStatus }) => {
  if (gameStatus === GAME_STATUS.NOT_STARTED) return null;

  return (
    <div>
      <p>xxx</p>
    </div>
  );
};

const mapStateToProps = state => ({
  gameStatus: state.gameStatus
});

GameScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired
};

GameScreen = connect(
  mapStateToProps,
  {}
)(GameScreen);

export default GameScreen;
