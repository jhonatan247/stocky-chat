const express = require('express');
const cors = require('cors');
const axios = require('axios');
const io = require('socket.io')(3001);
const chatRoomsApiBaseURL = 'http://localhost:3000/api/chat-rooms/';

const AccountRouter = require('./app/authentication/routes').AccountRouter;
const AuthenticationRouter = require('./app/authentication/routes')
  .AuthenticationRouter;
const ChatRoomRouter = require('./app/chat_room/routes').ChatRoomRouter;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/accounts', AccountRouter);
app.use('/api/auth', AuthenticationRouter);
app.use('/api/chat-rooms/', ChatRoomRouter);

io.on('connection', socket => {
  socket.on('create-chat-room', async ({ token, name }) => {
    const response = axios({
      method: 'post',
      url: chatRoomsApiBaseURL,
      data: {
        name
      },
      headers: { Authorization: token }
    });
    requestData = response.data;
    socket.broadcast.emit('chat-room-created', requestData);
  });
  socket.on('send-message', async ({ token, message, chatRoomId }) => {
    const response = axios({
      method: 'post',
      url: chatRoomsApiBaseURL + chatRoomId,
      data: {
        message
      },
      headers: { Authorization: token }
    });
    requestData = response.data;
    socket.broadcast.emit(`message-sended-to-${chatRoomId}`, requestData);
  });
});

module.exports = app;
