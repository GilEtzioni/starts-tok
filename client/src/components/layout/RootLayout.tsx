import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <div> 
      <nav>
        <NavLink to="/"></NavLink>
        <NavLink to="dictionary"></NavLink>
        <NavLink to="contact"></NavLink>
        <NavLink to="wordle"></NavLink>
        <NavLink to="maincourse"></NavLink>
        <NavLink to="speedGame"></NavLink>
        <NavLink to="hangman"></NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default RootLayout;
