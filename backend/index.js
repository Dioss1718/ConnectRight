const express = require('express'); 
const http = require('http'); 
const { Server } = require('socket.io'); 
const cors = require('cors'); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' 
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'] 
  }
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('send_message', (data) => {
    console.log(`Message received from ${socket.id}: ${data.message}`);
  io.emit('receive_message', data);
  });
   socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`); 
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
