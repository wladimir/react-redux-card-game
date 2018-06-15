import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ text, onClick }) => (
  <Link to="/game">
    <button onClick={onClick} className="button">
      {text}
    </button>
  </Link>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
