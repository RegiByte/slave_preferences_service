import { ApplicationHttp } from '../../lib/Http';

export const getApplication = ({ hostname }) =>
  ApplicationHttp.get(`/${hostname}`);
