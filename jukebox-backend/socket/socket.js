const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { storeMessage } = require('../controller/chatController');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('No token provided'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.userId}`);
    socket.join(socket.userId);

    socket.on('private-message', async ({ to, content }) => {
      try {
        const message = await storeMessage(socket.userId, to, content);

        // Send message to the receiver in real-time
        io.to(to).emit('private-message', {
          from: socket.userId,
          content: message.content,
          timestamp: message.timestamp
        });
      } catch (err) {
        console.error('Message error:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ Disconnected: ${socket.userId}`);
    });
  });
};

module.exports = initSocket;
