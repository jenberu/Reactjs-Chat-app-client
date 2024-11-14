import logo from './logo.svg';
import './App.css';
import ChatRoom from './components/chatRoom/ChatRoom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ChatRoom roomId="1" username="User1" />;
      </header>
    </div>
  );
}

export default App;
