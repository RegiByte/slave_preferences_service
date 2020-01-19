import { groupBy } from 'lodash';
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
    return this.errors.length ? groupBy(this.errors, 'field') : null;
  }
}

export function validationErrors(errors) {
  return {
    error: {
      name: 'Validation',
      message: 'Validation Errors',
      frames: errors,
    },
  };
}

configure({
  formatter: Formatter,
  removeAdditional: true,
});
