'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('partida', ['id_user_2'], {
      type: 'foreign key',
      name: 'partida_id_user_2_fk',
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
      'partida',
      'partida_id_user_2_fk'
   );
  }
};
