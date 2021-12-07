import express from 'express';

import User from 'controllers/userController';
import userValidation from 'validation/userValidation';
import method from 'utils/method';

const router = express.Router();

router
  .route('/signup')
  .post(userValidation.validateSignup, User.createUser)
  .all(method);

router
  .route('/login')
  .post(userValidation.validateLogin, User.createUser)
  .all(method);

export default router;
