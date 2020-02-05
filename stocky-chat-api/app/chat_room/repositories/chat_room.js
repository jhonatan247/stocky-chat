const ChatRoom = require('../../../models').ChatRoom;
const Message = require('../../../models').Message;
let sequelize = require('../../../models').sequelize;

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
  try {
    const messageId = (
      await Message.create(messageData, { transaction: transaction })
    ).dataValues.id;
    console.log((await selectMessageById(messageId)).dataValues);
    return (await selectMessageById(messageId)).dataValues;
  } catch (e) {
    console.log(e);
  }
};

module.exports.selectLastMessages = async function(chatRoomId) {
  const queryParameters = {
    chatRoom: chatRoomId
  };
  return (
    await Message.findAll({
      attributes: ['id', 'message', 'owner', 'chatRoom'],
      include: [
        {
          model: sequelize.models.AccountPublic,
          as: 'account'
        }
      ],
      where: queryParameters,
      order: [['createdAt', 'DESC']],
      limit: 50
    })
  ).reverse();
};

async function selectMessageById(messageId) {
  return await Message.findOne({
    attributes: ['id', 'message', 'owner', 'chatRoom'],
    include: [
      {
        model: sequelize.models.AccountPublic,
        as: 'account'
      }
    ],
    where: { id: messageId }
  });
}
