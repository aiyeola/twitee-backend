import database from 'database/models';

const { Posts, Comments, Likes, Users } = database;

class PostService {
  static async createPost(post) {
    try {
      const data = await Posts.create(post);

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getAllPosts() {
    try {
      const data = await Posts.findAll({
        subQuery: false,
        attributes: ['id', 'userId', 'post', 'createdAt'],
        include: [
          {
            model: Comments,
            as: 'comments',
            attributes: ['id', 'userId', 'comment'],
          },
          {
            model: Likes,
            as: 'likes',
            attributes: ['id'],
          },
          {
            model: Users,
            as: 'user',
            attributes: ['name', 'email'],
          },
        ],
        raw: false,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async findPost(id) {
    try {
      const post = await Posts.findOne({ where: id });
      return post;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      return await Posts.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
export default PostService;
