'use strict';
module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define('curso', {
    sigla: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len: {
          args: [3,5],
          msg: "Precisa conter entre 3 e 5 caracters" 
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len: {
          args: [3,50],
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
    Curso.belongsTo(models.area,{
      foreignKey: 'id_area'
    });
    Curso.hasMany(models.user,{
      foreignKey: 'id_curso'
    });
  };
  return Curso;
};