import React, { Component } from "react";
import PropTypes from "prop-types";

class Player extends Component {
  render() {
    return (
      <div className={`player-base p${this.props.id + 1}`}>
        <div className="stats">stats</div>
        <div className="cards">
          {this.props.cards.filter(card => !card.played)}
        </div>
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
