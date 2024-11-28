// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import SidebarItem from './SidebarItem';
import './sidebar.css';
import { BiGroup } from 'react-icons/bi';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="icon" ><BiGroup size={50}/> </h2>
      <SidebarItem label="Home" icon="🏠" to="/"/>
      <SidebarItem label="Profile" icon="👤" to='/profile'/>
      <SidebarItem label="Settings" icon="⚙️"to='/setting'/>
      <SidebarItem label="Logout" icon="🚪" to='/logout'/>
    </div>
  );
};

export default Sidebar;
