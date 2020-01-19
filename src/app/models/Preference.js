import Sequelize, { Model } from 'sequelize';

class Preference extends Model {
  static init(sequelize) {
    super.init(
      {
        key: Sequelize.STRING,
        value: Sequelize.STRING,
        deleteable: Sequelize.BOOLEAN,
        type: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'preferences',
      }
    );

    return this;
  }

  static associate(_models) {}
}

export default Preference;
