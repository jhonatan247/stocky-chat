let AuthenticationRepository = require('../repositories')
  .AuthenticationRepository;

module.exports.authorize = async (req, res, next) => {
  try {
    let authorization =
      req.headers['x-access-token'] || req.headers['authorization'];
    validateAuthorizationHeader(authorization);
    const decoded = await AuthenticationRepository.checkToken(authorization);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports.authenticateWithToken = async (req, res) => {
  try {
    let authorization =
      req.headers['x-access-token'] || req.headers['authorization'];
    validateAuthorizationHeader(authorization);
    const accountData = await AuthenticationRepository.checkToken(
      authorization
    );
    res.json({
      success: true,
      message: 'authentication successful',
      ...accountData
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

module.exports.authenticate = async (req, res) => {
  try {
    validateLoginRequiredParameters(req.body);
    const accountData = await AuthenticationRepository.createToken(req.body);
    res.json({
      success: true,
      message: 'authentication successful',
      ...accountData
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

function validateLoginRequiredParameters(login) {
  if (!login.email) {
    throw new Error('email parameter is required');
  }
  if (!login.password) {
    throw new Error('password parameter is required');
  }
}

module.exports.disavow = async (req, res) => {
  try {
    await AuthenticationRepository.deleteToken(req.decoded);
    res.json({
      success: true,
      message: 'token already disavowed'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
