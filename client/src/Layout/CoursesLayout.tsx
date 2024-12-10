import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const CoursesLayout: React.FC = () => {
  return (
    <div> 
      <nav>
        <NavLink to="A1"></NavLink>
        <NavLink to="A2"></NavLink>
        <NavLink to="B1"></NavLink>
        <NavLink to="B2"></NavLink>
        <NavLink to="C1"></NavLink>
        <NavLink to="C2"></NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default CoursesLayout;
