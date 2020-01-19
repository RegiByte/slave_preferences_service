import { Op } from 'sequelize';
import { searchFields } from '../../helper/query';
import PreferenceResource from '../http/resources/PreferenceResource';
import {
  MISSING_KEY,
  PREFERENCE_ALREADY_EXISTS,
  PREFERENCE_NOT_DELETEABLE,
  PREFERENCE_NOT_FOUND,
} from '../../constants/errors';
import { JSON as JSON_TYPE, RAW } from '../../constants/preferenceTypes';

class PreferenceRepository {
  constructor({ models }) {
    this.models = models;

    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    this.stringifyValue = this.stringifyValue.bind(this);
  }

  static with(deps) {
    return new PreferenceRepository(deps);
  }

  async index({ offset, limit, sort_order, sort_field, search }) {
    const { Preference } = this.models;
    const makeSearch = searchFields(['key']);

    const options = {
      offset,
      limit,
      order: [[sort_field, sort_order]],
      attributes: ['key', 'value', 'type', 'deleteable'],
    };

    if (search) {
      options.where = {
        [Op.or]: makeSearch(search),
      };
    }

    const preferences = await Preference.findAndCountAll(options);

    return PreferenceResource.presentCollection({
      collection: preferences,
      offset,
      limit,
    });
  }

  async show({ key }) {
    const { Preference } = this.models;

    const preference = await Preference.findOne({
      where: {
        key,
      },
    });

    if (!preference) {
      throw new Error(PREFERENCE_NOT_FOUND);
    }

    return PreferenceResource.present(preference);
  }

  async store({ key, value, type }) {
    const { Preference } = this.models;

    const existingPreference = await Preference.findOne({
      where: {
        key,
      },
    });

    if (existingPreference) {
      throw new Error(PREFERENCE_ALREADY_EXISTS);
    }

    const newPreference = await Preference.create({
      key,
      value: this.stringifyValue({
        type,
        value,
      }),
      type,
      deleteable: true,
    });

    return PreferenceResource.present(newPreference);
  }

  async update({ key, value }) {
    if (!key) {
      throw new Error(MISSING_KEY);
    }

    const { Preference } = this.models;

    const existingPreference = await Preference.findOne({
      where: {
        key,
      },
    });

    if (!existingPreference) {
      throw new Error(PREFERENCE_NOT_FOUND);
    }

    const { type } = existingPreference;

    const updatedPreference = await existingPreference.update({
      value: this.stringifyValue({ type, value }),
    });

    return PreferenceResource.present(updatedPreference);
  }

  async destroy({ key }) {
    if (!key) {
      throw new Error(MISSING_KEY);
    }

    const { Preference } = this.models;

    const preference = await Preference.findOne({
      where: {
        key,
      },
    });

    if (!preference) {
      throw new Error(PREFERENCE_NOT_FOUND);
    }

    if (!preference.deleteable) {
      throw new Error(PREFERENCE_NOT_DELETEABLE);
    }

    await preference.destroy();

    return {
      message: 'deleted',
    };
  }

  stringifyValue({ type, value }) {
    const options = {
      [RAW]: () => value,
      [JSON_TYPE]: () => JSON.stringify(value),
    };

    return options[type] ? options[type]() : options[RAW]();
  }
}

export default PreferenceRepository;
