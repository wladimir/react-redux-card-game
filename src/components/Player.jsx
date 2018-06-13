import React, { Component } from "react";
import PropTypes from "prop-types";

class Player extends Component {
  componentDidMount() {
    this.cards = this.generateCards(this.props.cards);
  }

  componentDidUpdate() {
    this.cards = this.generateCards(this.props.cards);
  }

  generateCards(cards) {}

  render() {
    return <div>{this.props.cards}</div>;
  }
}

Player.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  cards: PropTypes.object.isRequired
};

export default Player;
