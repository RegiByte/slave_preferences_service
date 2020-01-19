import PaginatedResource from '../../../lib/PaginatedResource';
import { JSON as JSON_TYPE, RAW } from '../../../constants/preferenceTypes';

class PreferenceResource extends PaginatedResource {
  constructor() {
    super();
    this.present = this.present.bind(this);
    this.parseValue = this.parseValue.bind(this);
  }

  present(item) {
    return {
      key: item.key,
      value: this.parseValue(item),
      type: item.type,
      deleteable: Boolean(item.deleteable),
    };
  }

  parseValue(item) {
    const options = {
      [RAW]: () => item.value,
      [JSON_TYPE]: () => JSON.parse(item.value),
    };

    return options[item.type] ? options[item.type]() : options[RAW]();
  }
}

export default new PreferenceResource();
