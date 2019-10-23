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
    // associations can be defined here
  };
  return Area;
};