// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title" >Chat Room </h2>
      <SidebarItem label="Home" icon="🏠" />
      <SidebarItem label="Profile" icon="👤" />
      <SidebarItem label="Settings" icon="⚙️" />
      <SidebarItem label="Logout" icon="🚪" />
    </div>
  );
};

export default Sidebar;
