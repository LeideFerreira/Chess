'use strict';
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('curso', {
    sigla: DataTypes.STRING,
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  Curso.associate = function(models) {
    // associations can be defined here
  };
  return Curso;
};