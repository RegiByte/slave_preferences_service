import { MISSING_ORIGIN } from '../../../../constants/errors';

export default async function ValidateOrigin(req, res, next) {
  const { origin } = req.headers;

  if (!origin) {
    return next(new Error(MISSING_ORIGIN));
  }

  return next();
}
