import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

export const Header = ({
  setQuestionIndex,
  setImageIndex,
  setSquareVisibility,
}) => {
  const handleRestart = () => {
    setQuestionIndex(0);
    setImageIndex(0);
    setSquareVisibility(Array(9).fill(true));
  };
  return (
    <section className="header-container">
      <section className="header">
        <h1>CSI Catchphrase</h1>
      </section>
      <section className="navigation">
        <Link to="/" onClick={handleRestart}>
          Restart game
        </Link>
      </section>
    </section>
  );
};
