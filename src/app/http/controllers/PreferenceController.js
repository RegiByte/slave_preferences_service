import Controller from '../../../lib/Controller';
import { errorHandler } from '../../../helper/errorHandlers';
import PreferenceRepository from '../../repositories/PreferenceRepository';

class PreferenceController extends Controller {
  async index(req, res) {
    try {
      const { models } = req;
      const {
        offset,
        limit,
        sort_order,
        sort_field,
        search = '',
      } = req.validatedQuery;

      const preferences = await PreferenceRepository.with({
        models,
      }).index({
        offset,
        limit,
        sort_order,
        sort_field,
        search,
      });

      return res.json(preferences);
    } catch (e) {
      return errorHandler(e.response ? e.response.data.error : e, req, res);
    }
  }

  async show(req, res) {
    try {
      const { models } = req;
      const { key } = req.params;

      const preference = await PreferenceRepository.with({
        models,
      }).show({
        key,
      });

      return res.json(preference);
    } catch (e) {
      return errorHandler(e.response ? e.response.data.error : e, req, res);
    }
  }

  async store(req, res) {
    try {
      const { models, validatedBody } = req;
      const { key, value, type } = validatedBody;

      const preference = await PreferenceRepository.with({
        models,
      }).store({
        key,
        value,
        type,
      });

      return res.json(preference);
    } catch (e) {
      return errorHandler(e.response ? e.response.data.error : e, req, res);
    }
  }

  async update(req, res) {
    try {
      const { key } = req.params;
      const { models, validatedBody } = req;
      const { value } = validatedBody;

      const updatedPreference = await PreferenceRepository.with({
        models,
      }).update({
        key,
        value,
      });

      return res.json(updatedPreference);
    } catch (e) {
      return errorHandler(e.response ? e.response.data.error : e, req, res);
    }
  }

  async destroy(req, res) {
    try {
      const { models } = req;
      const { key } = req.params;

      const response = await PreferenceRepository.with({
        models,
      }).destroy({ key });

      return res.json(response);
    } catch (e) {
      return errorHandler(e.response ? e.response.data.error : e, req, res);
    }
  }
}

export default new PreferenceController();
