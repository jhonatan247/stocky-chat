'use strict';

module.exports.build = DataTypes => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    message: {
      allowNull: false,
      validate: {
        notEmpty: true
      },
      type: DataTypes.STRING
    },
    owner: {
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    chatRoom: {
      allowNull: false,
      references: {
        model: 'ChatRooms',
        key: 'id'
      },
      type: DataTypes.INTEGER
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
