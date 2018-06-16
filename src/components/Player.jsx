import React, { Component } from "react";
import PropTypes from "prop-types";
import PlayerStats from "./PlayerStats";

class Player extends Component {
  render() {
    return (
      <div className={`player-base p${this.props.id + 1}`}>
        <PlayerStats name={this.props.name} score={this.props.score} />
        <div className="cards">{this.props.cards}</div>
      </div>
    );
  }
}

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired
};

export default Player;
