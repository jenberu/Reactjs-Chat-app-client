import './App.css';
import ChatRoom from './components/chatRoom/ChatRoom';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import { useAuth } from './contexts/userContext';
import UserProfileForm from './pages/register/Register';

function App() {
  const { user } = useAuth()||{};
 
  return (
    
  <Router>
    <Routes>
      <Route element={<Layout />}>
          <Route path='/' element={<ChatRoom roomId="1" username={ user?.username} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<UserProfileForm />} />     
      </Route>
     </Routes>
      </Router>
  );
}

export default App;
