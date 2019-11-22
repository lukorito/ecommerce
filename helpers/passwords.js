const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        reject(error);
      }
      resolve(hash);
    });
  });
}

async function checkIfPasswordsMatch(newPassword, storedPass) {
  return await bcrypt.compare(newPassword, storedPass);
}

module.exports = {
  hashPassword,
  checkIfPasswordsMatch,
};
