import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Player from "../components/Player";
import Card from "../components/Card";
import { playCard } from "../actions";
import cardBg from "../assets/images/card_background.jpg";
import Loader from "../components/Loader";
import { GAME_STATUS } from "../constants";
import { Redirect } from "react-router-dom";
import "../assets/styles/GameScreen.css";

class GameScreen extends Component {
  static defaultProps = {
    playedCards: [],
    players: []
  };

  static propTypes = {
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
            value: PropTypes.number.isRequired,
            index: PropTypes.number.isRequired,
            played: PropTypes.bool.isRequired
          })
        ).isRequired
      }).isRequired
    ),
    currentPlayer: PropTypes.number.isRequired,
    currentRound: PropTypes.number.isRequired,
    playedCards: PropTypes.array.isRequired,
    playCard: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.playedCards = this.createCards(this.props.playedCards);
    this.players = this.createPlayers(this.props.players);
  }

  createCards(playedCards) {
    return playedCards.map(card => (
      <Card
        key={card.code}
        image={card.image}
        code={card.code}
        value={card.value}
        index={card.index}
        onClick={() => {
          // no op
        }}
      />
    ));
  }

  createPlayers(players) {
    return players.map((player, i) => (
      <Player
        key={player.id}
        id={player.id}
        name={player.name}
        score={player.score}
        cards={player.cards.map((card, j) => (
          <Card
            key={card.code}
            image={i > 0 ? cardBg : card.image}
            code={card.code}
            value={card.value}
            index={card.index}
            onClick={
              i > 0
                ? () => {
                    /*no op*/
                  }
                : () => playCard(j)
            }
          />
        ))}
      />
    ));
  }

  render() {
    if (this.props.gameStatus === GAME_STATUS.NOT_STARTED)
      return <Redirect to="/" />;
    else if (this.props.gameStatus !== GAME_STATUS.STARTED) return <Loader />;

    return (
      <div className="game-screen">
        <div className="played-cards center">
          <ul>{this.createCards(this.props.playedCards)}</ul>
        </div>
        <div>{this.createPlayers(this.props.players)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  players: state.players,
  currentPlayer: state.currentPlayer,
  currentRound: state.currentRound,
  playedCards: state.playedCards
});

const mapDispatchToProps = dispatch => {
  return {
    playCard: index => {
      dispatch(playCard(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreen);
