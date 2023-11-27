import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/restart.css';

export const RestartGame = ({
  setQuestionIndex,
  setImageIndex,
  setSquareVisibility,
  classname,
}) => {
  const handleRestart = () => {
    setQuestionIndex(0);
    setImageIndex(0);
    setSquareVisibility(Array(9).fill(true));
  };

  return (
    <section className={classname}>
      <Link to="/" onClick={handleRestart}>
        Restart game
      </Link>
    </section>
  );
};
