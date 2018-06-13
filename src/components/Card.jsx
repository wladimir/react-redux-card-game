import React from "react";
import PropTypes from "prop-types";

const Card = ({ image, code, index, onClick }) => {
  const handleClick = () => {
    console.log("clicked on card ", index);
    onClick(index);
  };

  return (
    <div className="card">
      <img src={image} alt={"playing card " + code} onClick={handleClick} />
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Card;
