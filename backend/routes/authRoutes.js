const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/authController');
const { redirectIfAuth } = require('../middleware/auth');

// Login
router.get('/login',   redirectIfAuth, authController.loginPage);
router.post('/login',                  authController.login);

// Signup
router.get('/signup',  redirectIfAuth, authController.signupPage);
router.post('/signup',                 authController.signup);

// Logout
router.get('/logout',                  authController.logout);

module.exports = router;