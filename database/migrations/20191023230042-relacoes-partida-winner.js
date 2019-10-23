'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('partida', ['winner'], {
      type: 'foreign key',
      name: 'partida_winner_fk',
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
      'partida_winner_fk'
   );
  }
};
