import { Router } from 'express';
import MetasController from './app/http/controllers/MetasController';
import ValidateOrigin from './app/http/middlewares/validations/ValidateOrigin';
import SetupDB from './app/http/middlewares/SetupDB';

const router = new Router();

router.use(ValidateOrigin);

const baseURL = `/${process.env.API_VERSION}/player`;

const url = path => `${baseURL}${path}`;

router.get(url('/metas'), SetupDB, MetasController.index);

export default router;
