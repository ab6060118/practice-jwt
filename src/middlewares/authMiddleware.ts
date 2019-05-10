import express, { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import { verifyToken } from '../utils/auth';

export const authMiddleware: RequestHandler = (req, res, next) => {
  let authorization = req.headers.authorization;
  let error_message: string | undefined = undefined;

  if (!authorization) {
    error_message = 'auth fail';

    res.status(401).json({
      success: false,
      error_message,
    });
    return;
  }

  let format = authorization.split(' ')[0];
	let token = authorization.split(' ')[1]
  let decode = verifyToken(token);

	if(format !== 'Bearer') {
		error_message = 'token format error'
	}
  else if (decode instanceof jwt.JsonWebTokenError) {
    error_message = 'auth fail';
  }

  if (decode instanceof jwt.TokenExpiredError) {
    error_message = 'token expired';
  }

  if (error_message) {
    res.status(401).json({
      success: false,
      error_message,
    });
    return;
  }

	res.locals.username = decode.username
	res.locals.token = token

  next();
};
