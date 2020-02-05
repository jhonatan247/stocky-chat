require('dotenv').config();
const express = require('express');
const cors = require('cors');

const socketServer = require('./socket_server');

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

socketServer.initServer();

module.exports = app;
