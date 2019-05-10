import jwt from 'jsonwebtoken';
import Crypoto from 'crypto';

import { db } from './db';
import { config } from '../../config/config';
import { IProfile } from '../models/profile';

type UserModel = { username: string; password: string };

type GetUser = (username: string) => UserModel | undefined;

type GetUserByToken = (token: string) => UserModel | undefined;

interface IgetProfile {
  (username: string): { [key: string]: any };
}

interface IsetProfile {
  (username: string, profile: IProfile): boolean;
}

type HashPassword = (password: string) => string;

export const getUser: GetUser = username => {
  try {
    return db.getData(`/users/${username}`);
  } catch (e) {
    return undefined;
  }
};

export const getUserByToken: GetUserByToken = token => {
  let tokenObj = jwt.decode(token);

  if (!tokenObj) return undefined;

  console.log(tokenObj);

  return getUser('sdf');
};

export const getProfile: IgetProfile = username => {
  try {
    return db.getData(`/profile/${username}`);
  } catch (e) {
    return {};
  }
};

export const setProfile: IsetProfile = (username, profile) => {
  db.push(`/profile/${username}`, profile);
  return true;
};

export const hashPassword: HashPassword = password => {
  return Crypoto.createHash('sha256')
    .update(password)
    .digest('base64');
};
