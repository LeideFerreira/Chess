'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'user'
  });
  User.associate = function(models) {
    User.belongsTo(models.curso,{
      as: 'curso',
      foreignKey: 'id_curso'
    });
    User.hasMany(models.mensagem,{
      foreignKey: 'id_user'
    });
    User.hasMany(models.partida,{
      foreignKey: 'id_user_1',
      foreignKey: 'id_user_2',
      foreignKey: 'winner'
    });
  };
  return User;
};