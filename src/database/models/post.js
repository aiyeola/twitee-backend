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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Posts;
};
