// src/components/Sidebar/SidebarItem.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ label, icon,to }) => {
  return (
    <div className="sidebar-item">
      <NavLink className="nav-link" to={to}>
        <span className="sidebar-icon">{icon}</span>
        <span className="sidebar-label">{label}</span>
        </NavLink>
    </div>
  );
};

export default SidebarItem;
