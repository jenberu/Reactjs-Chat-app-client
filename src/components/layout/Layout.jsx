import React, { useState } from "react";
import Sidebar from "../sidebar/SideBar";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Workspaces from "../workspace/WorkSpaceList";
import "./layout.css";

const Layout = () => {
  const [menuOpen, setMenuopen] = useState(true);
  const handleMenuToggle = () => {
    setMenuopen(!menuOpen);
  };

  return (
    <div className="layout">
      <Header onMenuToggle={handleMenuToggle} />
      <div className="home">
        <div className={`side-bar ${menuOpen ? "open" : "closed"}`}>
        <Sidebar />
      
          <Workspaces/>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
