import express from 'express';

import { db } from '../utils/db';
import { config } from '../../config/config';
import { getUser, hashPassword } from '../utils/users';

const accountRouter = express.Router();

accountRouter.use((req, res, next) => {
  let { username, password } = req.body;

  if (!username || !password) {
    res.json({
      success: false,
      error_message: 'missing parameter username or password.',
    });
  } else {
    next();
  }
});

accountRouter.post('/register', (req, res) => {
  let { username, password } = req.body;
  let user = getUser(username);

  if (!user) {
    let hashPwd = hashPassword(password);

    db.push(`/users/${username}`, { username, password: hashPwd });

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
      error_message: 'the username already be registered.',
    });
  }
});

export default accountRouter;
