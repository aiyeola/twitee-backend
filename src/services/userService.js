import database from 'database/models';

const { Users } = database;

class UserService {
  static async createUser(user) {
    try {
      const createdUser = await Users.create(user);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async findUser(param) {
    try {
      const user = await Users.findOne({ where: param });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
