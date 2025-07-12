import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const messagesEndRef = useRef(null); 

  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        author: username,
        message: message,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
      socket.emit('send_message', messageData);
      setMessage(''); // Clear message input after sending
    }
  };

  
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    
    return () => {
      socket.off('receive_message');
    };
  }, []); 

 
  const joinChat = () => {
    if (username.trim() !== '') {
      setJoined(true);
    }
  };

  return (
    <div className="app-container">
      {!joined ? (
        <div className="join-chat-container">
          <h1 className="join-chat-title">Welcome!</h1>
          <input
            type="text"
            placeholder="Enter username"
            className="join-chat-input"
            onChange={(event) => setUsername(event.target.value)}
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
            <div ref={messagesEndRef} /> {/* Element to scroll to */}
          </div>

          {/* Chat Footer  */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
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