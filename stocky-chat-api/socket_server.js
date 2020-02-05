'use strict';
const axios = require('axios');
const io = require('socket.io')(process.env.SOCKET_PORT);
const chatRoomsApiBaseURL = `http://localhost:${process.env.PORT}/api/chat-rooms/`;
const chatBotBaseURL = process.env.CHAT_BOT_URL;
const amqp = require('amqplib/callback_api');
const amqpURL = process.env.RABBITMQ_URL;

module.exports.initServer = () => {
  initializeMessageReceiver();
  io.on('connection', socket => {
    setOnCreateChatRoom(socket);
    setOnSendMessage(socket);
  });
};

function initializeMessageReceiver() {
  amqp.connect(amqpURL, (error, connection) => {
    if (!connection) {
      console.log('we cannot connet to rabbitmq server ' + amqpURL);
      return;
    }
    console.log('connected to rabbitmq server ' + amqpURL);
    connection.createChannel(
      (error, channel) => {
        const queue = 'CloudAMQP';
        channel.assertQueue(queue, { durable: false });

        channel.consume(queue, message => {
          if (!message.fields.redelivered) {
            const messageData = JSON.parse(message.content.toString());
            axios({
              method: 'post',
              url: chatRoomsApiBaseURL + messageData.chatRoomId,
              data: {
                message: messageData.message
              },
              headers: { Authorization: messageData.authorization }
            }).then(response => {
              const requestData = response.data;
              io.emit(
                `message-sended-to-${messageData.chatRoomId}`,
                requestData
              );
            });
          }
        });
      },
      { noAck: true }
    );
  });
}

function setOnCreateChatRoom(socket) {
  socket.on('create-chat-room', async ({ token, name }) => {
    const response = await axios({
      method: 'post',
      url: chatRoomsApiBaseURL,
      data: {
        name
      },
      headers: { Authorization: token }
    });
    const requestData = response.data;
    io.emit('chat-room-created', requestData);
  });
}

function setOnSendMessage(socket) {
  socket.on(
    'send-message',
    async ({ token, message, chatRoomId, accountId }) => {
      if (isACommnad(message)) {
        axios({
          method: 'post',
          url: chatBotBaseURL,
          data: {
            chatRoomId,
            stockId: message.replace('/stock=', '')
          },
          headers: { Authorization: token }
        }).catch(error => {
          socket.emit(`error-on-command`, message.replace('/stock=', ''));
        });
        return;
      }
      const response = await axios({
        method: 'post',
        url: chatRoomsApiBaseURL + chatRoomId,
        data: {
          message
        },
        headers: { Authorization: token }
      });
      const requestData = response.data;
      io.emit(`message-sended-to-${chatRoomId}`, requestData);
    }
  );
}

function isACommnad(message) {
  return message.startsWith('/stock=');
}
