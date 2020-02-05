let CryptographyAssistant = require('../assistants').CryptographyAssistant;
let AccountRepository = require('./account');

module.exports.checkToken = async function(token) {
  let decodedToken = CryptographyAssistant.getTokenInformation(token);

  let account = await AccountRepository.findByEmail(decodedToken.email);
  if (!account) throw Error('user does not exist');

  let isValid = token == account.token;
  if (!isValid) throw Error('token unauthorized');

  return getPublicAccountData(account);
};

module.exports.createToken = async function(accountData) {
  const account = await AccountRepository.findByEmail(accountData.email);
  if (!account) throw Error('wrong email');

  const encryptedPassword = CryptographyAssistant.encryptWithSHA2(
    accountData.password + account.salt
  );
  if (encryptedPassword === account.encryptedPassword) {
    const newAccountData = getPublicAccountData(account);
    newAccountData.token = null;
    const token = CryptographyAssistant.generateToken(newAccountData);
    await account.update({ token: token });
    return getPublicAccountData(account);
  } else {
    throw Error('wrong password');
  }
};

module.exports.deleteToken = async function(accountData) {
  let currentAccount = await AccountRepository.findByEmail(accountData.email);
  await currentAccount.update({ token: null });
};

function getPublicAccountData(account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    token: account.token,
    status: account.status
  };
}
