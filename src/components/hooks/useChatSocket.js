// useChatSocket.js
import { useEffect, useState } from "react";

const useChatSocket = (roomId, username) => {
  const [messages, setMessages] = useState([]);
  const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const chatSocketUrl = `${protocol}${window.location.host}/ws/chat/room/${roomId}/`;
  
  useEffect(() => {
    const chatSocket = new WebSocket(chatSocketUrl);
    
    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const dateOptions = { hour: "numeric", minute: "numeric", hour12: true };
      const datetime = new Date(data.datetime).toLocaleTimeString("en", dateOptions);
      setMessages((prev) => [
        ...prev,
        { user: data.user, content: data.message, datetime },
      ]);
    };

    chatSocket.onclose = () => console.error("Chat socket closed unexpectedly");
    chatSocket.onerror = (error) => console.error("WebSocket error:", error);

    return () => chatSocket.close();
  }, [chatSocketUrl]);

  const sendMessage = (message) => {
    const chatSocket = new WebSocket(chatSocketUrl);
    chatSocket.onopen = () => {
      chatSocket.send(JSON.stringify({ message }));
    };
  };

  return { messages, sendMessage };
};

export default useChatSocket;