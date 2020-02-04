const CommandRecognizerRepository = require('../repositories')
  .CommandRecognizerRepository;

module.exports.recognizeCommnad = async (req, res) => {
  try {
    if (!req.body.stockId) {
      throw new Error('stockId parameter is required');
    }
    await CommandRecognizerRepository.recognizeCommand(req.body.stockId);
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
