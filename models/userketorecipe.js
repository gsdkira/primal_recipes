'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userKetoRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userKetoRecipe.init({
    userId: DataTypes.INTEGER,
    ketoRecipeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userKetoRecipe',
  });
  return userKetoRecipe;
};