import React from 'react';
import csiImage from '../images/csi.png';

export const Square = ({ visible, highlighted, onClick }) => {
  return (
    <div
      className={`square ${visible ? 'visible' : 'hidden'} ${
        highlighted ? 'highlighted' : ''
      }`}
      onClick={onClick}
    >
      {visible && <img className="square-img" alt="csi" src={csiImage} />}
    </div>
  );
};
