import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useChatSocket = (roomId, username) => {
  const [messages, setMessages] = useState([]);
  const [chatSocket, setChatSocket] = useState(null); // To store the WebSocket instance
  const protocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const backendHost = "localhost:8000";
  const token = localStorage.getItem("accessToken");
  const refresh_token = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const chatSocketUrl = `${protocol}${backendHost}/ws/chat/room/${roomId}/?token=${token}&refresh_token=${refresh_token}`;

  useEffect(() => {
    // Create WebSocket connection once
    const socket = new WebSocket(chatSocketUrl);
    setChatSocket(socket); // Store WebSocket instance in state
    
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const dateOptions = { hour: "numeric", minute: "numeric", hour12: true };
      const datetime = new Date(data.datetime).toLocaleTimeString("en", dateOptions);
      setMessages((prev) => [
        ...prev,
        { user: data.user, content: data.message, datetime },
      ]);
    };

    socket.onclose = (event) => {
      if (event.code === 1000) {
        console.log("WebSocket closed normally.");
      }
    };
    
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      socket.close();
    };
  }, [chatSocketUrl]);

  const sendMessage = (message) => {
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      // Send the message over the existing WebSocket connection
      chatSocket.send(JSON.stringify({ message }));
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return { messages, sendMessage };
};

export default useChatSocket;
