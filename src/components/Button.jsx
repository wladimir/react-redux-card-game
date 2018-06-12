import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick }) => (
  <button onClick={onClick} className="button">
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
