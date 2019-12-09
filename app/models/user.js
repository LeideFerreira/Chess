'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4,40],
          msg: 'O nome precisa ter entre 4 e 40 caracteres.'
        }
      }
    },
    email: DataTypes.STRING,
    senha: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'user'
  });
  User.associate = function (models) {
    User.belongsTo(models.curso, {
      as: 'curso',
      foreignKey: 'id_curso'
    });
    User.hasMany(models.mensagem, {
      foreignKey: 'id_user'
    });
    User.hasMany(models.partida, {
      foreignKey: 'id_user_1',
      foreignKey: 'id_user_2',
      foreignKey: 'winner'
    });
  };
  return User;
};