import express from 'express';

import Post from 'controllers/postController';
import postValidation from 'validation/postValidation';
import commentValidation from 'validation/commentValidation';
import method from 'utils/method';
import verify from 'middlewares/verify';
import Access from 'middlewares/userRoles';

const router = express.Router();

router
  .route('/')
  .post(verify, postValidation.validatePost, Post.addPost)
  .get(verify, Post.getPosts)
  .all(method);

router
  .route('/:id/comment')
  .post(verify, commentValidation.validateComment, Post.addComment)
  .all(method);

router
  .route('/:id')
  .delete(verify, commentValidation.validateId, Access.isOwner, Post.deletePost)
  .all(method);

export default router;
