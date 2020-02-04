let jwt = require('jsonwebtoken');
let crypto = require('crypto');
const config = require('../../../config/app_config');

module.exports.encryptWithSHA2 = function(textToEncrypt) {
  return crypto
    .createHash('SHA256')
    .update(textToEncrypt)
    .digest('hex');
};

module.exports.generateRandomString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

module.exports.generateToken = function(data) {
  return jwt.sign(data, config.secret, {
    expiresIn: config.timeToExpireSessionInHours
  });
};

module.exports.getTokenInformation = function(token) {
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  return jwt.verify(token, config.secret);
};
