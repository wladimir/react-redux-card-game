import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StartScreenStyle = styled.div`
  font-family: "Lobster";
`;

let StartScreen = ({ started }) => {
  if (started) return null;

  return <StartScreenStyle>start screen</StartScreenStyle>;
};

const mapStateToProps = state => ({
  started: state.started
});

StartScreen.propTypes = {
  started: PropTypes.bool.isRequired
};

StartScreen = connect(
  mapStateToProps,
  {}
)(StartScreen);

export default StartScreen;
