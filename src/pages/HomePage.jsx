import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/question');
  };

  return (
    <section className="home-page">
      <h1>Welcome to CSI Catchphrase</h1>
      <section className="question-link-container">
        <button className="link-btn" onClick={handleClick}>
          Click to start game
        </button>
      </section>
    </section>
  );
};