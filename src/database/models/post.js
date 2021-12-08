export default (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      post: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {},
  );
  Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      foreignKey: 'postId',
      as: 'likes',
      onDelete: 'CASCADE',
    });
    Posts.hasMany(models.Comments, {
      foreignKey: 'postId',
      as: 'comments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Posts;
};
