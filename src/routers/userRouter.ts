import express from 'express';

import { getProfile, getUserByToken, setProfile } from '../utils/users';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter
  .use(authMiddleware)
  .route('/profile')
  .get((req, res) => {
    let profile = getProfile(res.locals.username);

    res.json({
      success: true,
      data: {
        username: res.locals.username,
        ...profile,
      },
    });
  })
  .post((req, res) => {
    let { email, nickname, phone } = req.body.profile;

    setProfile(res.locals.username, { email, nickname, phone });

    res.json({
      success: true,
      profile: {
        email,
        nickname,
        phone,
      },
    });
  });

export default userRouter;
