import database from 'database/models';

const { Posts } = database;

class PostService {
  static async createPost(post) {
    try {
      const data = await Posts.create(post);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
export default PostService;
