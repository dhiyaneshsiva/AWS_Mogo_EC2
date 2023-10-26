const bcrypt = require('bcrypt');

const encryptText = async (text) => {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(text, salt);
  return encrypted;
};

const isEncryptedTextMatch = (normal, encrypted) => {
  return bcrypt.compareSync(normal, encrypted);
};

module.exports = {
  encryptText,
  isEncryptedTextMatch
};