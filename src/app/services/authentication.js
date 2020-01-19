import { AuthHttp } from '../../lib/Http';

export const authenticate = ({ authorization, origin }) =>
  AuthHttp.get('/token/validate', {
    headers: {
      origin,
      authorization,
    },
  });
