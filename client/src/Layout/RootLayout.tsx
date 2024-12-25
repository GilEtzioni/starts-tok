import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
  return (
    <div> 
      <nav>
        <NavLink to="/"></NavLink>
        <NavLink to="dictionary"></NavLink>
        <NavLink to="hangman"></NavLink>
        <NavLink to="maincourse"></NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default RootLayout;
