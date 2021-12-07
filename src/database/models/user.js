export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.Posts, {
      foreignKey: 'userId',
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'userId',
    });
  };
  return Users;
};
