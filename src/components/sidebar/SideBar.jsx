import React from 'react';
import SidebarItem from './SidebarItem';
import './sidebar.css';
import { BiGroup } from 'react-icons/bi';
import { MdMessage } from 'react-icons/md';//icons from materail design 


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="icon" ><BiGroup size={50}/> </h2>
      <SidebarItem label="Home" icon="🏠" to="/" />
      <SidebarItem label="DMs" icon={<MdMessage />} to='/direct message' />
      <SidebarItem label="Profile" icon="👤" to='/profile'/>
      <SidebarItem label="Settings" icon="⚙️"to='/setting'/>
      <SidebarItem label="Logout" icon="🚪" to='/logout' />

      
    </div>
  );
};

export default Sidebar;
