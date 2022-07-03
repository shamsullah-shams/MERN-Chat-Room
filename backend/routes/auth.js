const express = require('express');
const authController = require('../controller/auth');
const { body } = require('express-validator');
const router = express.Router();

router.get('/api/users', authController.getAllUsers);
router.post('/api/auth', authController.isAuth);
router.post('/api/user/login',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Enter a valid Email')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Enter password 8 or more than 8'),
    ], authController.postSignin);

module.exports = router;