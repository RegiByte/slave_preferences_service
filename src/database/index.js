import Sequelize from 'sequelize';
import User from '../app/models/User';

const models = [User];

class Database {
  constructor({ config }) {
    this.config = config;
    this.models = models;

    this.init = this.init.bind(this);
    this.getModels = this.getModels.bind(this);
    this.getConnection = this.getConnection.bind(this);

    this.init();
  }

  init() {
    this.connection = new Sequelize({
      ...this.config,
    });

    this.models.forEach(model => model.init(this.connection));

    this.models.forEach(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  getConnection() {
    return this.connection;
  }

  getModels() {
    return this.getConnection().models;
  }
}

export default Database;
