import Response from 'utils/response';
import postService from 'services/postService';

export default class User {
  static addPost = async (req, res, next) => {
    const { id: userId } = req.user;

    const rawData = req.body;
    rawData.userId = userId;
    const addedPost = await postService.createPost(rawData);

    try {
      return Response.customResponse(res, 200, 'twit post created', addedPost);
    } catch (error) {
      return next(error);
    }
  };
}
