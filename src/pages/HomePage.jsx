import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../layout/Header';
import '../styles/home.css';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/question');
  };

  return (
    <>
      <Header />
      <section className="home-page">
        <section className="question-link-container">
          <button className="link-btn" onClick={handleClick}>
            Click to start game
          </button>
        </section>
      </section>
    </>
  );
};
