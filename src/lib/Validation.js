import { groupBy, mapValues } from 'lodash';
import { configure } from 'indicative/validator';

class Formatter {
  constructor() {
    this.errors = [];
  }

  addError(error, field, validation, args) {
    let message = error;

    if (error instanceof Error) {
      validation = 'ENGINE_EXCEPTION';
      message = error.message;
    }

    this.errors.push({
      field,
      validation,
      message,
      args,
    });
  }

  toJSON() {
    return this.errors.length
      ? mapValues(
          groupBy(this.errors, 'field'),
          ({ field: _field, ...rest }) => ({
            ...rest,
          })
        )
      : null;
  }
}

configure({
  formatter: Formatter,
  removeAdditional: true,
});
