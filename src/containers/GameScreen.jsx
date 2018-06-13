import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GAME_STATUS } from "../constants";

import Player from "../components/Player";

class GameScreen extends Component {
  render() {
    if (this.props.gameStatus !== GAME_STATUS.STARTED) return null;

    return <div className="game-screen" />;
  }
}

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  players: state.players,
  currentPlayer: state.currentPlayer,
  currentRound: state.currentRound
});

export default connect(
  mapStateToProps,
  null
)(GameScreen);

GameScreen.propTypes = {
  gameStatus: PropTypes.string.isRequired,

  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,

      cards: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.string.isRequired,
          code: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired
        })
      ).isRequired
    }).isRequired
  ),
  currentPlayer: PropTypes.number.isRequired,
  currentRound: PropTypes.number.isRequired
};
