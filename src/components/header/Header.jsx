import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './header.scss';

function Header({ onMenuToggle }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
     // Listen for resize events
     window.addEventListener('resize', handleResize);

     // Check on initial load
     handleResize();
 
     // Clean up event listener
     return () => window.removeEventListener('resize', handleResize);
   }, []);
  return (
    <header className="header">
      <div className="links">
        <div className="menu-icon">
          <IconButton edge="start" color="inherit" onClick={onMenuToggle}>
            <MenuIcon style={{ fontSize: 40 }} />
          </IconButton>

        </div>

        <div className='login-logout'>
          <div>
          <em>Well Come:Jemberu Kassie</em>

          </div>
          <div>
          <Link className="logout" to="/login">
          <em>  Logout </em>
          </Link>
          </div>
          <div>
          <Link className="login" to="/login">
          <em>Login </em>
          </Link>
          </div>
          <div>
          <Link className="change-password" to="/login">
          <em>change password </em>
          </Link>
       </div>
        
        </div>
        
        <h1 className='header-text'>{isMobile ? 'Ethiopian TSC ...' : ' Taxpayer Service Center'}</h1>

      </div>

    </header>
  );
}

export default Header;
