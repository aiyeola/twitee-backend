import express from 'express';

import Post from 'controllers/postController';
import postValidation from 'validation/postValidation';
import method from 'utils/method';
import verify from 'middlewares/verify';

const router = express.Router();

router
  .route('/')
  .post(verify, postValidation.validatePost, Post.addPost)
  .all(method);

export default router;
