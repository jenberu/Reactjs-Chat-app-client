import React, { useEffect, useState } from 'react';
import './workspace.scss'
import axios from 'axios';
function Workspaces() {
  const [chatrooms, setChatrooms] = useState([]);

  // Fetch chatrooms from the database
  useEffect(() => {
    async function fetchChatrooms() {
      try {
        const response = await axios.get('http://localhost:8000/chat/workspaces/'); // Update with your API endpoint
        const data = await response.data;
        setChatrooms(data);
      } catch (error) {
        console.error('Error fetching chatrooms:', error);
      }
    }
    fetchChatrooms();
  }, []);

  return (
    <aside className="workspace">
      <h2 className="workspace__title">Workspaces</h2>
      <ul className="workspace__list">
        {chatrooms.map((room) => (
          <li key={room.id} className="workspace__list__item">
            {room.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Workspaces;
