import jwt from 'jsonwebtoken';
import Crypoto from 'crypto';

import { db } from './db';
import { config } from '../../config/config';

interface IveriyToken {
  (token: string): any;
}

export const verifyToken: IveriyToken = token => {
	try {
		return jwt.verify(token, config.secret)
	} catch(e) {
		return e
	}
};
