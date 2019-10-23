'use strict';
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('curso', {
    sigla: DataTypes.STRING,
    nome: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len: {
          Args: [3,50],
          msg: "Precisa conter entre 3 e 50 caracters" 
        }
      }
    },
    descricao: DataTypes.TEXT,
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
    tableName: 'curso',
  });
  Curso.associate = function(models) {
    // associations can be defined here
  };
  return Curso;
};