export default (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'Likes',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {},
  );
  Likes.associate = (models) => {
    Likes.belongsTo(models.Posts, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Likes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Likes;
};
