let CryptographyAssistant = require('../assistants').CryptographyAssistant;
const Account = require('../../../models').Account;

module.exports.findByEmail = async function(email) {
  return await Account.findOne({
    where: { email: email, status: 'active' }
  });
};

module.exports.create = async function(accountData, transaction) {
  accountData.salt = CryptographyAssistant.generateRandomString(100);
  accountData.encryptedPassword = CryptographyAssistant.encryptWithSHA2(
    accountData.password + accountData.salt
  );
  accountData.status = 'active';
  return await Account.create(accountData, { transaction: transaction });
};
