import jwt from 'jsonwebtoken';
import { MISSING_TOKEN_SETTINGS } from '../constants/errors';

const sign = ({ tokenDuration }) => ({ tokenKey }) => {
  if (!tokenKey || !tokenDuration) {
    throw new Error(MISSING_TOKEN_SETTINGS);
  }

  return data => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        data,
        tokenKey,
        {
          expiresIn: Number(tokenDuration),
        },
        (err, token) => {
          if (err) {
            return reject(err);
          }

          return resolve(token);
        }
      );
    });
  };
};

const verify = ({ tokenKey }) => {
  return token => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, tokenKey, {}, (err, decoded) => {
        if (err) {
          return reject(err);
        }

        return resolve(decoded);
      });
    });
  };
};

module.exports = {
  sign: sign({
    tokenDuration: process.env.TOKEN_DURATION,
  }),
  verify,
};
