import express from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../../config/config';
import { getUser, hashPassword } from '../utils/users';

const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  let { username, password } = req.body;

  let user = getUser(username);
  let error_message: string | undefined = undefined;
  let token: string | undefined = undefined;
	let hashPwd = hashPassword(password)

  if (user && user.password === hashPwd) {
    token = jwt.sign({ username: req.body.username }, config.secret, {
      expiresIn: 3600,
    });
  } else {
    error_message = 'user not found or wrong password';
  }

  res.json({
    success: error_message === undefined,
    error_message,
    token,
  });
});

export default authRouter;
