import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Establish a single socket connection outside the component.
// This prevents multiple connections when the component re-renders.
const socket = io.connect('http://localhost:3001');

function App() {
  // State to hold the text of the message being typed.
  const [message, setMessage] = useState('');
  // State to store all messages, forming the chat history.
  const [messageList, setMessageList] = useState([]);
  // State to store the user's chosen username.
  const [username, setUsername] = useState('');
  // State to track whether the user has joined the chat yet.
  const [joined, setJoined] = useState(false);
  // Ref to an element at the bottom of the message list, used for auto-scrolling.
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the chat window smoothly.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // This effect runs whenever a new message is added to the list.
  // Its purpose is to keep the chat window scrolled to the latest message.
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  // Function to send a message to the server.
  const sendMessage = () => {
    // Only send a message if the input isn't empty.
    if (message.trim() !== '') {
      // Create a data object for the message.
      const messageData = {
        author: username,
        message: message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
      // Emit the message to the server.
      socket.emit('send_message', messageData);
      // Clear the message input field after sending.
      setMessage('');
    }
  };

  // This effect runs only once when the component mounts.
  // It sets up a listener for messages coming from the server.
  useEffect(() => {
    // Listen for 'receive_message' events from the socket.
    socket.on('receive_message', (data) => {
      // Update the message list with the new message, preserving the old ones.
      setMessageList((list) => [...list, data]);
    });

    // Clean up the socket listener when the component unmounts.
    // This is important to prevent memory leaks.
    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Function to handle the user joining the chat.
  const joinChat = () => {
    // If a username has been entered, set the 'joined' state to true.
    if (username.trim() !== '') {
      setJoined(true);
    }
  };

  return (
    <div className="app-container">
      {/* Conditionally render the UI based on whether the user has joined */}
      {!joined ? (
        // UI for joining the chat
        <div className="join-chat-container">
          <h1 className="join-chat-title">Welcome!</h1>
          <input
            type="text"
            placeholder="Enter username"
            className="join-chat-input"
            onChange={(event) => setUsername(event.target.value)}
            // Allow joining by pressing Enter
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                joinChat();
              }
            }}
          />
          <button
            onClick={joinChat}
            className="join-chat-button"
          >
            Chat
          </button>
        </div>
      ) : (
        // UI for the main chat window
        <div className="chat-window-container">
          {/* Chat Header */}
          <div className="chat-header">
            <h2>ConnectRight :) </h2>
            <span className="chat-header-username">Logged in as: <span>{username}</span></span>
          </div>

          {/* Chat Body (Message Display Area) */}
          <div className="chat-body">
            {messageList.map((msg, index) => (
              <div
                key={index}
                // Dynamically apply a class based on whether the message was sent or received.
                className={`message-row ${msg.author === username ? 'sent' : 'received'}`}
              >
                <div
                  className={`message-bubble ${
                    msg.author === username ? 'sent-bubble' : 'received-bubble'
                  }`}
                >
                  <div className="message-author">
                    {msg.author === username ? 'You' : msg.author}
                  </div>
                  <div className="message-content">{msg.message}</div>
                  <div className={`message-time ${msg.author === username ? 'sent-time' : 'received-time'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {/* An empty div to act as a target for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              // Allow sending by pressing Enter
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
