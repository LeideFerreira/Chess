'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('mensagem', ['id_user'], {
      type: 'foreign key',
      name: 'mensagem_id_user_fk',
      references: {
      table: 'user',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint(
      'mensagem',
      'mensagem_id_user_fk'
   );
  }
};
