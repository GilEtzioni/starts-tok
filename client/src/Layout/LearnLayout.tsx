import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LearnLayout: React.FC = () => {
  return (
    <div> 
      <nav>
        <NavLink to=":name"></NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default LearnLayout;
