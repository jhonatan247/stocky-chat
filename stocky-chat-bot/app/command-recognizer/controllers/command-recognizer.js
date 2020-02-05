const CommandRecognizerRepository = require('../repositories')
  .CommandRecognizerRepository;
const amqp = require('amqplib/callback_api');
const amqpURL = process.env.RABBITMQ_URL;

module.exports.recognizeCommnad = async (req, res) => {
  try {
    let authorization =
      req.headers['x-access-token'] || req.headers['authorization'];
    validateAuthorizationHeader(authorization);
    validateDataToRecognize(req.body);
    const decodedCommandData = await CommandRecognizerRepository.recognizeCommand(
      req.body.stockId
    );
    if (!decodedCommandData.Date || decodedCommandData.Date == 'N/D') {
      throw new Error('stockId does not found');
    }
    const responseData = {
      authorization,
      stockId: req.body.stockId,
      chatRoomId: req.body.chatRoomId,
      decodedCommandData: decodedCommandData,
      message: `${decodedCommandData.Symbol} quote is $${decodedCommandData.Open} per share`
    };
    amqp.connect(amqpURL, (error, connection) => {
      connection.createChannel((error, channel) => {
        const queue = 'CloudAMQP';
        const message = JSON.stringify(responseData);
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));
      });
    });
    res.json({
      success: true,
      message: 'command succesful enqueued'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

function validateAuthorizationHeader(authorization) {
  if (!authorization) {
    throw new Error('authorization header is required');
  }
}

function validateDataToRecognize(data) {
  if (!data.stockId) {
    throw new Error('stockId parameter is required');
  }
  if (!data.chatRoomId) {
    throw new Error('chatRoomId parameter is required');
  }
}
