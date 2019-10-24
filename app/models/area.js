'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('area', {
  
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, 
  {
    underscored: true,
    tableName: 'area'
  });
  Area.associate = function(models) {
    Area.hasMany(models.curso,{
      foreignKey: 'id_area'
    });//um pra muitos
  };
  return Area;
}; 