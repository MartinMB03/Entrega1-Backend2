import { Router } from 'express';
import passport from 'passport';
import { register, login, getCurrentUser } from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;