'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ketoRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.ketoRecipe.belongsToMany(models.user, {through: 'userKetoRecipe'})
    }
  };
  ketoRecipe.init({
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ketoRecipe',
  });
  return ketoRecipe;
};