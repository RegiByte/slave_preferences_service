const { hash } = require('../../lib/Password');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    console.log('here we got');
    const password = await hash(process.env.MASTER_PASSWORD);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Master',
        username: 'master',
        password,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, _Sequelize) =>
    queryInterface.bulkDelete(
      'users',
      {
        username: 'master',
      },
      {}
    ),
};
