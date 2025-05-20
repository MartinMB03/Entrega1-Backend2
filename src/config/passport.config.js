import passport from 'passport';
import local from '../strategies/local.strategy.js';
import jwt from '../strategies/jwt.strategy.js';
import UserModel from '../models/user.model.js';

const initializePassport = () => {
    passport.use('local', local);
    passport.use('jwt', jwt);

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export default initializePassport;