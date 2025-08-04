// Import necessary modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Initialize the express app
const app = express();

// Enable CORS for the client application
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Create an HTTP server from the express app
const server = http.createServer(app);

// Initialize Socket.IO server and configure CORS
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Handle socket connections
io.on('connection', (socket) => {
    // Log when a user connects
    console.log(`User Connected: ${socket.id}`);

    // Listen for incoming messages
    socket.on('send_message', (data) => {
        // Log the received message
        console.log(`Message received from ${socket.id}: ${data.message}`);

        // Emit the message to all connected clients
        io.emit('receive_message', data);
    });

    // Handle user disconnections
    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

// Set the port for the server
const PORT = process.env.PORT || 3001;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});