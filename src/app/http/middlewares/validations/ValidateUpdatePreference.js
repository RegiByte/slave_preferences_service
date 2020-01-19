import { validateAll } from 'indicative/validator';
import { validationErrors } from '../../../../lib/Validation';

export default async function ValidateUpdatePreference(req, res, next) {
  try {
    const rules = {
      value: 'required',
    };

    req.validatedBody = await validateAll(req.body, rules);

    return next();
  } catch (e) {
    return res.status(422).json(validationErrors(e));
  }
}
