import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <section className="header">
      <h1>CSI Catchphrase</h1>
      <Link to={'/'}>Home</Link>
    </section>
  );
};
