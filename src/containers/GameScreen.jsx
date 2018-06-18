import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Player from "../components/Player";
import Card from "../components/Card";
import { playCard, restartGame } from "../actions";
import cardBg from "../assets/images/card_background.jpg";
import Loader from "../components/Loader";
import { GAME_STATUS } from "../constants";
import { Redirect } from "react-router-dom";
import WinScreen from "../components/WinScreen";
import "../assets/styles/GameScreen.css";

class GameScreen extends Component {
  static defaultProps = {
    playedCards: [],
    players: []
  };

  static propTypes = {
    gameStatus: PropTypes.number.isRequired,

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
            isPlayed: PropTypes.bool.isRequired
          })
        ).isRequired
      }).isRequired
    ),

    activePlayer: PropTypes.number.isRequired,
    playedCards: PropTypes.array.isRequired,
    playCard: PropTypes.func.isRequired,
    gameWinners: PropTypes.object.isRequired,
    restartGame: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.playedCards = this.createCards(this.props.playedCards);
    this.players = this.createPlayers(this.props.players);
  }

  createCards(playedCards) {
    return playedCards.map(card => (
      <li key={card.code}>
        <Card
          key={card.code}
          image={card.image}
          code={card.code}
          value={card.value}
          index={card.index}
        />
      </li>
    ));
  }

  createPlayers(players) {
    return players.map((player, i) => (
      <Player
        key={player.id}
        id={player.id}
        name={player.name}
        score={player.score}
        activePlayer={this.props.activePlayer}
        cards={player.cards
          .filter(card => !card.isPlayed)
          .map(card => (
            <Card
              key={card.code}
              image={i > 0 ? cardBg : card.image}
              code={card.code}
              value={card.value}
              index={card.index}
              onClick={i > 0 ? () => {} : this.props.playCard}
            />
          ))}
      />
    ));
  }

  renderWinners() {
    return Object.keys(this.props.gameWinners).length > 0 ? (
      <WinScreen
        gameWinners={this.props.gameWinners}
        onClick={this.props.restartGame}
      />
    ) : null;
  }

  render() {
    if (this.props.gameStatus === GAME_STATUS.NOT_STARTED)
      return <Redirect to="/" />;
    else if (this.props.gameStatus !== GAME_STATUS.STARTED) return <Loader />;

    return (
      <div className="game-screen">
        <div>{this.renderWinners()}</div>
        <div className="played-cards center">
          <ul>{this.createCards(this.props.playedCards)}</ul>
        </div>
        <div>{this.createPlayers(this.props.players)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameStatus: state.gameReducer.gameStatus,
  players: state.gameReducer.players,
  currentPlayer: state.gameReducer.currentPlayer,
  currentRound: state.gameReducer.currentRound,
  playedCards: state.gameReducer.playedCards,
  gameWinners: state.gameReducer.gameWinners,
  activePlayer: state.gameReducer.activePlayer
});

const mapDispatchToProps = dispatch => ({
  playCard: card => dispatch(playCard(card)),
  restartGame: () => dispatch(restartGame())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameScreen);
