import { validateAll } from 'indicative/validator';
import { validationErrors } from '../../../../lib/Validation';

export default async function ValidatePagination(req, res, next) {
  try {
    const rules = {
      offset: 'required|integer|above:-1',
      limit: 'required|integer|under:1000',
      sort_order: 'required|string|in:asc,desc',
      sort_field: 'required|string',
      search: 'string',
    };

    req.validatedQuery = await validateAll(req.query, rules);

    return next();
  } catch (e) {
    return res.status(422).json(validationErrors(e));
  }
}
