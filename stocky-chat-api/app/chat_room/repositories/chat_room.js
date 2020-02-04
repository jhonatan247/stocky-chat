const ChatRoom = require('../../../models').ChatRoom;
const Message = require('../../../models').Message;

module.exports.selectAll = async function() {
  return await ChatRoom.findAll();
};

module.exports.create = async function(chatRoomData, transaction) {
  chatRoomData.status = 'active';
  return (await ChatRoom.create(chatRoomData, { transaction: transaction }))
    .dataValues;
};

module.exports.insertMessage = async function(
  accountId,
  chatRoomId,
  message,
  transaction
) {
  const messageData = {
    owner: accountId,
    chatRoom: chatRoomId,
    message: message,
    status: 'active'
  };
  return (await Message.create(messageData, { transaction: transaction }))
    .dataValues;
};

module.exports.selectLastMessages = async function(chatRoomId) {
  const queryParameters = {
    chatRoom: chatRoomId
  };
  return await Message.findAll({
    where: queryParameters,
    order: [['createdAt', 'DESC']],
    limit: 50
  });
};
