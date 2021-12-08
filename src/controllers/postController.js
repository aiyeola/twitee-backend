import Response from 'utils/response';
import postService from 'services/postService';
import commentService from 'services/commentService';
import likeService from 'services/likeService';

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

  static getPosts = async (req, res, next) => {
    const posts = await postService.getAllPosts();

    try {
      return Response.customResponse(res, 200, 'all twit posts', posts);
    } catch (error) {
      return next(error);
    }
  };

  static addComment = async (req, res, next) => {
    const {
      params: { id },
      user: { id: userId },
    } = req;

    const rawData = req.body;
    rawData.userId = userId;
    rawData.postId = id;
    const addedPost = await commentService.addCommentToPost(rawData);

    try {
      return Response.customResponse(
        res,
        200,
        'comment added to post (twit)',
        addedPost,
      );
    } catch (error) {
      return next(error);
    }
  };

  static deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;

      const postExists = await postService.findPost({ id });

      if (!postExists) {
        return Response.notFoundError(res, 'post (twit) not found');
      }
      await postService.deletePost(id);
      return Response.customResponse(
        res,
        200,
        'post (twit) deleted successfully',
      );
    } catch (error) {
      return next(error);
    }
  };

  static likeOrUnlike = async (req, res, next) => {
    const {
      user: { id: userId },
      params: { id: postId },
    } = req;

    try {
      const exist = await postService.findPost({
        id: postId,
      });

      if (!exist) {
        return Response.notFoundError(res, 'post does not exist');
      }

      const like = { userId, postId };
      const alreadyLiked = await likeService.countLikes(like);
      const likes = await likeService.countLikes({ postId });

      if (!alreadyLiked) {
        await likeService.like(like);
        return Response.customResponse(res, 200, `successfully liked post`, {
          likes: likes + 1,
        });
      } else {
        await likeService.unlike(like);
        return Response.customResponse(res, 200, `successfully unliked post`, {
          likes: likes - 1,
        });
      }
    } catch (error) {
      return next(error);
    }
  };
}
