const ChatRoomRepository = require('../repositories').ChatRoomRepository;

module.exports.add = async (req, res) => {
  try {
    validateChatRoomRequiredParameters(req.body);
    const createdChatRoom = await ChatRoomRepository.create(req.body);
    res.json({
      success: true,
      ...createdChatRoom
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

function validateChatRoomRequiredParameters(user) {
  if (!user.name || user.name == '') {
    throw new Error('name parameter is required');
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const chatRooms = await ChatRoomRepository.selectAll();
    res.json({
      success: true,
      chatRooms: chatRooms
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const accountId = req.decoded.id;
    const chatRoomId = req.params.chatRoomId;
    const message = req.body.message;
    if (!message || message == '') {
      throw new Error('message parameter is required');
    }
    validateMessageRequiredParameters(req.body);
    const createdMessage = await ChatRoomRepository.insertMessage(
      accountId,
      chatRoomId,
      message
    );
    res.json({
      success: true,
      ...createdMessage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

function validateMessageRequiredParameters(messageData) {
  if (!messageData.message || messageData.message == '') {
    throw new Error('message parameter is required');
  }
}

module.exports.getLastMessages = async (req, res) => {
  try {
    const messages = await ChatRoomRepository.selectLastMessages(
      req.params.chatRoomId
    );
    res.json({
      success: true,
      messages: messages
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
