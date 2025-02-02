// ChatMessages.jsx
import React from "react";
import "./chatmessage.css";

const ChatMessages = ({ messages, currentUser }) => {
  return (
      <div className="chat-box">
        <p style={{color:'black'}}>messages</p>

      {messages.map((msg, index) => (
          <div
          key={index}
          className={`message ${msg.user === currentUser ? "sent" : "received"}`}
          >

          <strong>{msg.user === currentUser ? "Me" : msg.user}</strong>
          <br />
          {msg.content}
          <span className="date"> {msg.datetime}</span>

        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
