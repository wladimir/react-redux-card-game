import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

import "../assets/styles/ErrorScreen.css";

const ErrorScreen = ({ onClick }) => {
  return (
    <div className="center">
      <p className="error-text">
        {"Network error, please check your internet connection!"}
      </p>
      <Button text="Try again" onClick={onClick} />
    </div>
  );
};

ErrorScreen.propTypes = {
  error: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ErrorScreen;
