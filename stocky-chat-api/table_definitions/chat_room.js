'use strict';

module.exports.build = DataTypes => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      validate: {
        notEmpty: true
      },
      type: DataTypes.ENUM('active', 'deleted')
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  };
};
