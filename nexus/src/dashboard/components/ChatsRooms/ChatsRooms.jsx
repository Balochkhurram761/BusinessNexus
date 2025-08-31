import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000"); // Replace with your server URL

const ChatsRooms = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // chat messages
  const [users, setUsers] = useState([]); // sidebar users list
  const [selectedReceiver, setSelectedReceiver] = useState(null); // active chat user
  const messagesEndRef = useRef(null);
  const { id: receiverIdFromUrl } = useParams();

  // socket listener
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.receiverId === selectedReceiver) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedReceiver]);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // send message
  const sendMessage = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const senderId = user?.id;

    if (!selectedReceiver) {
      alert("Please select a user to chat with!");
      return;
    }

    if (message.trim() === "") return;

    const msgData = {
      senderId,
      receiverId: selectedReceiver,
      message,
      time: new Date().toLocaleTimeString(),
    };

    // Emit to socket
    socket.emit("send_message", msgData);

    // Send to backend (agar new chat hai to backend us waqt create karega)
    try {
      await axios.post(
        `http://localhost:5000/api/auth/sendmessage/${selectedReceiver}`,
        msgData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error sending message to server:", error);
    }

    // Update local chat (frontend pe show karne ke liye)
    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  };

  // get all users for sidebar
  const getshow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/getshow`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("users list: ", res.data.data);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // fetch chat with selected user
  const fetchdata = async (receiverId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/fetchdata/${receiverId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("chat messages: ", res.data.data);

      if (res.data.data.length > 0) {
        // agar purani chat mil gayi
        setMessages(res.data.data);
      } else {
        // agar koi purani chat nahi hai (new chat)
        setMessages([]);
      }

      setSelectedReceiver(receiverId); // jis user par click hua
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  useEffect(() => {
    getshow();
    if (receiverIdFromUrl) {
      fetchdata(receiverIdFromUrl);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r flex flex-col gap-4 border-gray-300 p-4 bg-gray-50">
        <h1 className="text-2xl font-bold text-blue-500">
          Chat with Entrepreum
        </h1>
        {users.map((item) => (
          <div
            key={item._id}
            onClick={() => fetchdata(item._id)}
            className={`flex gap-4 items-center cursor-pointer hover:bg-gray-200 p-2 rounded ${
              selectedReceiver === item._id ? "bg-gray-300" : ""
            }`}
          >
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={`http://localhost:5000/${item.image[0].replace(/\\/g, "/")}`}
              alt=""
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Right Chat Area */}
      <div className="w-2/3 flex flex-col p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 bg-white">
          {selectedReceiver ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3  flex ${
                    msg.receiverId === selectedReceiver
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <span className="text-xs text-gray-400 mr-2">{msg.time}</span>
                  <span
                    className={`px-3 py-2 rounded-lg ${
                      msg.receiverId === selectedReceiver
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {msg.message}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No messages yet...</p>
            )
          ) : (
            <p className="text-gray-400">Select a user to start chatting</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {selectedReceiver && (
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsRooms;
