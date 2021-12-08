import database from 'database/models';

const { Comments } = database;

class CommentService {
  static async addCommentToPost(comment) {
    try {
      const data = await Comments.create(comment);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
export default CommentService;
