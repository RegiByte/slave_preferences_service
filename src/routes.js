import { Router } from 'express';
import PreferenceController from './app/http/controllers/PreferenceController';
import ValidateOrigin from './app/http/middlewares/validations/ValidateOrigin';
import SetupDB from './app/http/middlewares/SetupDB';
import ValidatePagination from './app/http/middlewares/validations/ValidatePagination';
import Authenticate from './app/http/middlewares/Authenticate';
import ValidateStorePreference from './app/http/middlewares/validations/ValidateStorePreference';
import ValidateUpdatePreference from './app/http/middlewares/validations/ValidateUpdatePreference';

const router = new Router();

router.use(ValidateOrigin);

const baseURL = `/${process.env.API_VERSION}/preference`;

const url = path => `${baseURL}${path}`;

router.get(
  url('/'),
  ValidateOrigin,
  ValidatePagination,
  SetupDB,
  PreferenceController.index
);

router.get(url('/:key'), ValidateOrigin, SetupDB, PreferenceController.show);

router.post(
  url('/'),
  ValidateOrigin,
  Authenticate,
  SetupDB,
  ValidateStorePreference,
  PreferenceController.store
);

router.put(
  url('/:key'),
  ValidateOrigin,
  Authenticate,
  SetupDB,
  ValidateUpdatePreference,
  PreferenceController.update
);

router.delete(
  url('/:key'),
  ValidateOrigin,
  Authenticate,
  SetupDB,
  PreferenceController.destroy
);

export default router;
