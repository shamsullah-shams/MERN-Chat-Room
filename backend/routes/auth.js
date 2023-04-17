const express = require('express');
const authController = require('../controller/auth');
const { body } = require('express-validator');
const router = express.Router();

// @@ ---- route for return all users to the client
router.get('', authController.getAllUsers);

// // @@ ---- route for checking user authentications
// router.post('/api/auth', authController.isAuth);


// @@ ---- route for signing users
router.post('/login',
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