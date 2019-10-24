'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partida = sequelize.define('partida', {
    id_user_1: DataTypes.INTEGER,
    id_user_2: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    fen: DataTypes.STRING
  }, {
    underscored: true,
  });
  Partida.associate = function(models) {
    Partida.hasMany(models.mensagem,{
      foreignKey: 'id_partida'
    });
    Partida.belongsTo(models.user,{
      foreignKey: 'id_user_1',
      foreignKey: 'id_user_2',
      foreignKey: 'winner'
    });
  };
  return Partida;
};