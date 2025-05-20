import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/user.model.js';
import config from '../config/config.js';

const jwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}, async (jwtPayload, done) => {
    try {
        const user = await UserModel.findById(jwtPayload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

export default jwtStrategy;