const express = require('express');
const messageController = require('../controller/message');
const { body } = require('express-validator');
const router = express.Router();

// @@ ---- route for return all messages to the users
router.get('/api/getmessages', messageController.getAllMessages);
// @@ ---- route for creating new message
router.post('/api/newmessage',
    [
        body('userId')
            .trim()
            .isMongoId()
            .withMessage("Please Enter a mongodb id"),
        body('message')
            .trim()
            .exists()
            .withMessage("please Enter a message"),
        body('userImageUrl')
            .exists()
            .withMessage("User Profile not found"),
        body('userName')
            .exists()
            .withMessage("User Name should be provided"),

    ], messageController.createMessage);



module.exports = router;

