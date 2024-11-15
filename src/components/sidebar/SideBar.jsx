// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import SidebarItem from './SidebarItem';
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title" >Chat Room </h2>
      <SidebarItem label="Home" icon="🏠" to="/"/>
      <SidebarItem label="Profile" icon="👤" to='/profile'/>
      <SidebarItem label="Settings" icon="⚙️"to='/setting'/>
      <SidebarItem label="Logout" icon="🚪" to='/logout'/>
    </div>
  );
};

export default Sidebar;
