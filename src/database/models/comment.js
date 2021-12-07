export default (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
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
  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comments.belongsTo(models.Posts, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
    });
  };
  return Comments;
};
