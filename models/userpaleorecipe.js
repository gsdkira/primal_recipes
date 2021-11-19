'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userPaleoRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userPaleoRecipe.init({
    userId: DataTypes.INTEGER,
    paleoRecipeUrl: DataTypes.STRING,
    paleoRecipeLabel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userPaleoRecipe',
  });
  return userPaleoRecipe;
};