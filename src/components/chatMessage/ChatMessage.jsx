// ChatMessages.jsx
import React from "react";
import "./chatmessage.css";

const ChatMessages = ({ messages, currentUser }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.user === currentUser ? "sent" : "received"}`}
        >
          <strong>{msg.user === currentUser ? "Me" : msg.user}</strong>
          <span className="date"> {msg.datetime}</span>
          <br />
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
