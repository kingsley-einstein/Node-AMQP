import { UserCrud } from './db/controllers';
import { Express } from 'express';

/**
 * 
 * @param {Express} app 
 */
export const route = (app) => {
    app.post('/user', UserCrud.create);
    app.post('/profile', UserCrud.createProfile);
    app.post('/login', UserCrud.login);
}