import { errorHandler } from '../../../helper/errorHandlers';
import { getApplication } from '../../services/ApplicationService';
import Database from '../../../database';

export default async function SetupDB(req, res, next) {
  try {
    const { origin } = req.headers;
    const hostname = new URL(origin).host;

    const { data: application } = await getApplication({ hostname });

    req.application = application;
    req.DbInfo =
      application.db_infos.player_service ||
      application.db_infos.general_service;

    const {
      DB_DATABASE: database,
      DB_DIALECT: dialect,
      DB_HOST: host,
      DB_PASSWORD: password,
      DB_PORT: port,
      DB_USERNAME: username,
    } = req.DbInfo;

    req.db = new Database({
      config: {
        database,
        port,
        host,
        username,
        password,
        dialect,
        timezone: process.env.TZ,
        define: {
          timestamps: true,
          underscored: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      },
    });

    req.models = req.db.getModels();

    return next();
  } catch (e) {
    return errorHandler(e.response ? e.response.data.error : e, req, res);
  }
}
