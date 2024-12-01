// ChatRoom.jsx
import React, { useEffect, useState } from "react";
import ChatMessages from "../chatMessage/ChatMessage";
import MessageInput from "../messageInput/MessageInput";
import useChatSocket from "../hooks/useChatSocket";
import "./chat_room.css";

const ChatRoom = ({ roomId, username }) => {
  const { messages, sendMessage } = useChatSocket(roomId, username);
  
  return (
    <div className="chat-container">
     <div className="chat-nessage">
      <ChatMessages messages={messages} currentUser={username} />
    </div>
    <div className="chat-input">
      <MessageInput onSendMessage={sendMessage} />
        
    </div>
    </div>
   
  );
};

export default ChatRoom;
