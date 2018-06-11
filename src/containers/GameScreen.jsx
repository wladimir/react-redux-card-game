import React from "react";
import { bool } from "prop-types";
import { connect } from "react-redux";

let GameScreen = ({ started }) => {
  if (!started) return null;

  return <div>game screen</div>;
};

const mapStateToProps = state => ({
  started: state.started
});

GameScreen.propTypes = {
  started: bool.isRequired
};

GameScreen = connect(
  mapStateToProps,
  {}
)(GameScreen);

export default GameScreen;
