const AccountRepository = require('../repositories').AccountRepository;

module.exports.register = async (req, res) => {
  try {
    validateUserRequiredParameters(req.body);
    await AccountRepository.create(req.body);
    res.json({
      success: true,
      message: 'user succesful created'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

function validateUserRequiredParameters(user) {
  if (!user.name || user.name == '') {
    throw new Error('name parameter is required');
  }
  if (!user.email || user.email == '') {
    throw new Error('email parameter is required');
  }
  if (!user.password) {
    throw new Error('password parameter is required');
  }
  if (user.password.length < 6) {
    throw new Error('password must have more than 5 characters');
  }
}
