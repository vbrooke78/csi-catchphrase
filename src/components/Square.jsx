import React from 'react';
import csiImage from '../images/csi.png';
import '../styles/square.css';

export const Square = ({
  visible,
  highlighted,
  onClick,
  isFlashing,
  randomIndex,
  index,
  squareVisibility,
}) => {
  return (
    <div
      className={`square ${visible ? 'visible' : 'hidden'} ${
        highlighted ? 'highlighted' : ''
      } ${!isFlashing && randomIndex === index ? 'spinning' : ''} ${
        !isFlashing && !squareVisibility[index] ? 'fading' : ''
      }`}
      onClick={onClick}
    >
      {visible && <img className="square-img" alt="csi" src={csiImage} />}
    </div>
  );
};
