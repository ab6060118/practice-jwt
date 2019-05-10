import JsonDB from 'node-json-db';
import { config } from '../../config/config';

export const db = new JsonDB(config.dbPath, true, false, '/');
