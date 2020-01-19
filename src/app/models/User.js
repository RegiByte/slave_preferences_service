import Sequelize, { Model } from 'sequelize';
import { hash } from '../../lib/Password';
import { PASSWORD_REQUIRED } from '../../constants/errors';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await hash(user.password);
        return user;
      }

      throw new Error(PASSWORD_REQUIRED);
    });

    return this;
  }

  static associate(_models) {}
}

export default User;
