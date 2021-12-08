import express from 'express';

import authRoutes from './authRoutes';
import postRoutes from './postRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/post', postRoutes);

router.use((err, _, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({
      status: 400,
      errors: "Server can't handle the request currently",
    });
  }

  return next(err);
});

export default router;
