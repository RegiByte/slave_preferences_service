const bcrypt = require('bcrypt');

async function hash(password) {
  return bcrypt.hash(password, 10);
}

async function compare(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

module.exports = { hash, compare };
