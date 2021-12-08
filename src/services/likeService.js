import database from 'database/models';

const { Likes } = database;

class likeService {
  static async countLikes(like) {
    try {
      return await Likes.count({
        where: [like],
      });
    } catch (error) {
      throw error;
    }
  }

  static async like(like) {
    try {
      return await Likes.create(like);
    } catch (error) {
      throw error;
    }
  }

  static async unlike(like) {
    try {
      return await Likes.destroy({
        where: [like],
      });
    } catch (error) {
      throw error;
    }
  }
}

export default likeService;
