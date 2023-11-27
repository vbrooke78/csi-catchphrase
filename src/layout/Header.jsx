import React from 'react';
import '../styles/header.css';
import { RestartGame } from '../components/RestartGame';

export const Header = ({
  setQuestionIndex,
  setImageIndex,
  setSquareVisibility,
}) => {
  return (
    <section className="header-container">
      <section className="header">
        <h1>CSI Catchphrase</h1>
      </section>
      <RestartGame
        setQuestionIndex={setQuestionIndex}
        setImageIndex={setImageIndex}
        setSquareVisibility={setSquareVisibility}
        classname={'navigation'}
      />
    </section>
  );
};
