import { errorHandler } from '../../../helper/errorHandlers';
import { MISSING_AUTHORIZATION } from '../../../constants/errors';
import { authenticate } from '../../services/authentication';

export default async function Authenticate(req, res, next) {
  try {
    const { authorization, origin } = req.headers;

    if (!authorization) {
      return next(new Error(MISSING_AUTHORIZATION));
    }

    const response = await authenticate({ authorization, origin });

    req.user = response.data.user;

    return next();
  } catch (e) {
    return errorHandler(e.response ? e.response.data.error : e, req, res);
  }
}
