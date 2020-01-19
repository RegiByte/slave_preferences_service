import queryString from 'query-string';
import { MISSING_DB_INFO } from '../../../constants/errors';
// eslint-disable-next-line import/named
import { sign, verify } from '../../../lib/Jwt';

export default async function SetupJWT(req, res, next) {
  if (!req.DbInfo) {
    return next(new Error(MISSING_DB_INFO));
  }

  const tokenKey = queryString.stringify(req.DbInfo);

  req.JWT = {
    sign: sign({
      tokenKey,
    }),
    verify: verify({
      tokenKey,
    }),
  };

  return next();
}
