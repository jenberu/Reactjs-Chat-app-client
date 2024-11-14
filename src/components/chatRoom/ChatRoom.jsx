// ChatRoom.jsx
import React, { useEffect, useState } from "react";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import useChatSocket from "./useChatSocket";
import "./ChatRoom.css";

const ChatRoom = ({ roomId, username }) => {
  const { messages, sendMessage } = useChatSocket(roomId, username);
  
  return (
    <div className="chat-container">
      <ChatMessages messages={messages} currentUser={username} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
