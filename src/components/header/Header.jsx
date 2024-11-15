import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './header.scss';
import { useAuth } from '../../contexts/userContext';

function Header({ onMenuToggle }) {
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();

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
            <em>Well Come:{ user?.username.toUpperCase()}</em>
                     |
          </div>
        
          <div>
          <Link className="link" to="/login">
          <em>Login </em>
            </Link>
            |
          </div>
          <div>
          <Link className="link" to="/change-pass">
          <em>change password </em>
            </Link>
            |
            <Link className="link" to="/register">
          <em>Sign Up </em>
          </Link>
       </div>
        
        </div>
        
        <h1 className='header-text'>{isMobile ? ('Coders Chat ...').toUpperCase() : (' GC Coder Chat Center').toUpperCase()}</h1>

      </div>

    </header>
  );
}

export default Header;
