'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('mensagem', {
    id_partida: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    mensagem: DataTypes.STRING
  }, {
    underscored: true,
  });
  Mensagem.associate = function(models) {
    // associations can be defined here
    Mensagem.belongsTo(models.user,{
      foreignKey: 'id_user'
    });
    Mensagem.belongsTo(models.partida,{
      foreignKey: 'id_partida'
    });
  };
  return Mensagem;
};
//verificar relacao belongsToMany