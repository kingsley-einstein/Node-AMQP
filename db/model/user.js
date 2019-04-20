import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { environment } from '../../environments';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    token: String
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    genSalt(8, (error, salt) => {
        if (error) return next(error);
        hash(user.password, salt, (err, gen) => {
            if (err) return next(err);
            user.password = gen;
            user.token = sign({
                username: user.username,
                password: gen
            }, environment.JSON_SECRET);
            next();
        });
    });
});

/**
 * @param {Response} res
 * @param {string} password
 */
UserSchema.methods.checkPassword = function(res, password) {
    let user = this;
    compare(password, user.password, (err, success) => {
        if (err) throw err;
        if (!success) res.status(401).json({
            message: 'Incorrect password'
        });
        else res.status(200).json(user);
    });
}

export const User = model('User', UserSchema);