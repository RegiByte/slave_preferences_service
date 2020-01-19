import { validateAll } from 'indicative/validator';
import { isString } from 'lodash';
import { validationErrors } from '../../../../lib/Validation';
import * as preferenceTypes from '../../../../constants/preferenceTypes';

export default async function ValidateStorePreference(req, res, next) {
  try {
    const rules = {
      key: 'required|string',
      value: 'required',
      type: `required|string|in:${Object.values(preferenceTypes).filter(
        isString
      )}`,
    };

    req.validatedBody = await validateAll(req.body, rules);

    return next();
  } catch (e) {
    return res.status(422).json(validationErrors(e));
  }
}
