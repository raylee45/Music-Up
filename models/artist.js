'use strict';
const {
  Model, Deferrable
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.artist.belongsTo(models.user)
    }
  }
  artist.init({
    name: DataTypes.STRING,
    webURL: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};