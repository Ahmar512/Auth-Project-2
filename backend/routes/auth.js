import express from 'express'
import { login, signup, verifyEmail, logout, forgotPassword, resetPassword, checkAuth } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);
router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);




export default router;