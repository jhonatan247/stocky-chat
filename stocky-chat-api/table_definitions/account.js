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
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      },
      type: DataTypes.STRING
    },
    encryptedPassword: {
      allowNull: false,
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING
    },
    salt: {
      allowNull: false,
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING
    },
    token: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING(1000)
    },
    lastInteractionDate: {
      allowNull: true,
      type: DataTypes.DATE
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
