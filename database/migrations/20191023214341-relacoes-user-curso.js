'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('user', ['id_curso'], {
      type: 'foreign key',
      name: 'user_id_curso_fk',
      references: {
      table: 'curso',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint(
      'user',
      'user_id_curso_fk'
   );
  }
};
