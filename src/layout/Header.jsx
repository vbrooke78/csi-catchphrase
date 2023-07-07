import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

export const Header = () => {
  return (
    <section className="header-container">
      <section className="header">
        <h1>CSI Catchphrase</h1>
      </section>
      <section className="navigation">
        <Link to={'/'}>Restart game</Link>
      </section>
    </section>
  );
};
